from datetime import datetime

from pydantic import BaseModel, Field


class JobBase(BaseModel):
    title: str = Field(min_length=2)
    company: str = Field(min_length=2)
    location: str = Field(min_length=2)
    description: str = Field(min_length=10)


class JobCreate(JobBase):
    pass


class JobResponse(JobBase):
    id: int
    posted_date: datetime

    class Config:
        from_attribute = True
