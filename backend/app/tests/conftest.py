import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine

from app.db import get_session
from app.main import app
from app.models import Employer, Job
from app.routes import hash_password


@pytest.fixture(name="session")
def session_fixture():
    test_engine = create_engine("sqlite:///./test.db", echo=False)
    SQLModel.metadata.create_all(test_engine)
    with Session(test_engine) as session:
        yield session
    SQLModel.metadata.drop_all(test_engine)


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_test_session():
        yield session

    app.dependency_overrides[get_session] = get_test_session
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


@pytest.fixture(name="employer")
def employer_fixture(session: Session):
    employer = Employer(
        name="Test Employer",
        email="employer@example.com",
        password_hash=hash_password("password123"),
    )
    session.add(employer)
    session.commit()
    session.refresh(employer)
    return employer


@pytest.fixture(name="test_job")
def test_job_fixture(session: Session):
    job = Job(
        title="Test Job",
        description="This is a test job.",
        company="Test Company",
        location="Test Location",
    )
    session.add(job)
    session.commit()
    session.refresh(job)
    return job
