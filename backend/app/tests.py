import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine

from app.db import get_session
from app.main import app
from app.models import Job


@pytest.fixture(name="session")
def session_fixture():
    """Create a new database session for testing."""
    test_engine = create_engine("sqlite:///./test.db", echo=False)
    SQLModel.metadata.create_all(test_engine)
    with Session(test_engine) as session:
        yield session
    SQLModel.metadata.drop_all(test_engine)


@pytest.fixture(name="client")
def client_fixture(session: Session):
    """Create a TestClient that uses the testing database session."""

    def get_test_session():
        yield session

    app.dependency_overrides[get_session] = get_test_session
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


@pytest.fixture(name="test_job")
def test_job_fixture(session: Session):
    """Create a sample job in the testing database."""
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


def test_create_job(client: TestClient):
    response = client.post(
        "/jobs/",
        json={
            "title": "New Job",
            "company": "New Company",
            "location": "New Location",
            "description": "Job description",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "New Job"
    assert data["description"] == "Job description"
    assert data["company"] == "New Company"


def test_create_job_missing_fields(client: TestClient):
    response = client.post(
        "/jobs/",
        json={
            "title": "Incomplete Job",
            "company": "Some Company",
            # Missing location and description
        },
    )
    assert response.status_code == 422  # Unprocessable Entity


def test_list_jobs(client: TestClient, test_job: Job):
    response = client.get("/jobs/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == test_job.title


def test_list_jobs_with_search(client: TestClient, test_job: Job):
    response = client.get("/jobs/?search=Test")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == test_job.title


def test_list_jobs_with_search_nonexists(client: TestClient, test_job: Job):
    response = client.get("/jobs/?search=Nonexistent")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 0
