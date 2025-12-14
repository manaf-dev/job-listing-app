from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, or_, select

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
def list_jobs(search: Optional[str] = None, session: Session = Depends(get_session)):
    statement = select(Job)

    if search:
        search_term = f"%{search.lower()}%"
        statement = statement.where(
            or_(Job.title.ilike(search_term), Job.company.ilike(search_term))
        )

    results = session.exec(statement).all()
    return results


@router.get("/{job_id}", response_model=JobResponse)
def get_job_by_id(job_id: int, session: Session = Depends(get_session)):
    statement = select(Job).where(Job.id == job_id)
    job = session.exec(statement).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job
