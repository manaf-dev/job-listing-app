from datetime import datetime

from sqlmodel import Field, SQLModel


class Job(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    company: str
    location: str
    description: str
    posted_date: datetime = Field(default_factory=datetime.now)
    employer_id: int | None = Field(default=None, foreign_key="employer.id")


class Employer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str = Field(index=True, unique=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class EmployerToken(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    token: str = Field(index=True, unique=True)
    employer_id: int = Field(foreign_key="employer.id")
    expires_at: datetime
