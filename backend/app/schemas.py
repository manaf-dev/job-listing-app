from pydantic import BaseModel, Field


class JobCreate(BaseModel):
    title: str = Field(min_length=2)
    company: str = Field(min_length=2)
    location: str = Field(min_length=2)
    description: str = Field(min_length=10)
