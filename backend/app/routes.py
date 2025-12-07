from fastapi import APIRouter, Depends
from sqlmodel import Session

from .db import get_session
from .models import Job
from .schemas import JobCreate

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/", response_model=Job)
def create_job(job: JobCreate, session: Session = Depends(get_session)):
    db_job = Job.model_validate(job)
    session.add(db_job)
    session.commit()
    session.refresh(db_job)
    return db_job
