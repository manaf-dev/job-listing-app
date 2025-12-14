from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from .db import get_session
from .models import Job
from .schemas import JobCreate, JobResponse

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.post("/", status_code=201, response_model=Job)
def create_job(job: JobCreate, session: Session = Depends(get_session)):
    db_job = Job.model_validate(job)
    session.add(db_job)
    session.commit()
    session.refresh(db_job)
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

