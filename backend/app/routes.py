import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlmodel import Session, select

from .config import get_logger
from .db import get_session
from .models import Employer, EmployerToken, Job
from .schemas import (
    EmployerAuthResponse,
    EmployerCreate,
    EmployerLogin,
    EmployerResponse,
    JobCreate,
    JobResponse,
)

router = APIRouter(prefix="/jobs", tags=["jobs"])
auth_router = APIRouter(prefix="/employers", tags=["employers"])

TOKEN_TTL_HOURS = 8
logger = get_logger(__name__)


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def create_token() -> str:
    return secrets.token_hex(24)


def parse_bearer_token(authorization: str | None) -> str:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
        )

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
        )

    return token


def get_current_employer(
    authorization: str | None = Header(default=None),
    session: Session = Depends(get_session),
) -> Employer:
    token = parse_bearer_token(authorization)

    now = datetime.utcnow()
    statement = select(EmployerToken).where(EmployerToken.token == token)
    token_row = session.exec(statement).first()
    if not token_row or token_row.expires_at < now:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token expired",
        )

    employer = session.get(Employer, token_row.employer_id)
    if not employer:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Employer not found",
        )

    return employer


@auth_router.post("/register", status_code=201, response_model=EmployerResponse)
def register_employer(payload: EmployerCreate, session: Session = Depends(get_session)):
    existing = session.exec(
        select(Employer).where(Employer.email == payload.email)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Employer already exists")

    employer = Employer(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
    )
    session.add(employer)
    session.commit()
    session.refresh(employer)
    logger.info("Employer registered: %s", employer.email)
    return employer


@auth_router.post("/login", response_model=EmployerAuthResponse)
def login_employer(payload: EmployerLogin, session: Session = Depends(get_session)):
    employer = session.exec(
        select(Employer).where(Employer.email == payload.email)
    ).first()
    if not employer or employer.password_hash != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token()
    expires_at = datetime.utcnow() + timedelta(hours=TOKEN_TTL_HOURS)
    token_row = EmployerToken(
        token=token, employer_id=employer.id, expires_at=expires_at
    )
    session.add(token_row)
    session.commit()
    logger.info("Employer logged in: %s", employer.email)

    return EmployerAuthResponse(
        token=token,
        employer=EmployerResponse.model_validate(employer),
    )


@auth_router.post("/logout", status_code=204)
def logout_employer(
    authorization: str | None = Header(default=None),
    session: Session = Depends(get_session),
):
    token = parse_bearer_token(authorization)
    token_row = session.exec(
        select(EmployerToken).where(EmployerToken.token == token)
    ).first()
    if token_row:
        session.delete(token_row)
        session.commit()
    logger.info("Employer logged out")
@router.post("/", status_code=201, response_model=Job)
def create_job(
    job: JobCreate,
    session: Session = Depends(get_session),
    employer: Employer = Depends(get_current_employer),
):
    db_job = Job.model_validate(job, update={"employer_id": employer.id})
    session.add(db_job)
    session.commit()
    session.refresh(db_job)
    logger.info("Job created by employer %s: %s", employer.email, db_job.title)
    return db_job


@router.get("/", response_model=list[JobResponse])
def list_jobs(
    search: Optional[str] = None,
    location: Optional[str] = None,
    session: Session = Depends(get_session),
):
    statement = select(Job)

    if search:
        statement = statement.where(
            Job.title.ilike(f"%{search}%") | Job.company.ilike(f"%{search}%")
        )

    if location:
        statement = statement.where(Job.location.ilike(f"%{location}%"))

    return session.exec(statement).all()


@router.get("/{job_id}", response_model=JobResponse)
def get_job_by_id(job_id: int, session: Session = Depends(get_session)):
    statement = select(Job).where(Job.id == job_id)
    job = session.exec(statement).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job
