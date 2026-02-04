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
    employer_id: int | None

    class Config:
        from_attributes = True


class EmployerBase(BaseModel):
    name: str = Field(min_length=2)
    email: str = Field(pattern=r"^[^@]+@[^@]+\.[^@]+$")


class EmployerCreate(EmployerBase):
    password: str = Field(min_length=8)


class EmployerLogin(BaseModel):
    email: str = Field(pattern=r"^[^@]+@[^@]+\.[^@]+$")
    password: str = Field(min_length=8)


class EmployerResponse(EmployerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class EmployerAuthResponse(BaseModel):
    token: str
    employer: EmployerResponse
