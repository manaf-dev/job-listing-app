from fastapi.testclient import TestClient

from app.models import Employer, Job


def login_employer(client: TestClient, employer: Employer) -> str:
    response = client.post(
        "/employers/login",
        json={"email": employer.email, "password": "password123"},
    )
    return response.json()["token"]


def test_create_job_requires_auth(client: TestClient):
    response = client.post(
        "/jobs/",
        json={
            "title": "New Job",
            "company": "New Company",
            "location": "New Location",
            "description": "Job description",
        },
    )
    assert response.status_code == 401


def test_create_job(client: TestClient, employer: Employer):
    token = login_employer(client, employer)
    response = client.post(
        "/jobs/",
        json={
            "title": "New Job",
            "company": "New Company",
            "location": "New Location",
            "description": "Job description",
        },
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "New Job"
    assert data["description"] == "Job description"
    assert data["company"] == "New Company"
    assert data["employer_id"] == employer.id


def test_create_job_missing_fields(client: TestClient, employer: Employer):
    token = login_employer(client, employer)
    response = client.post(
        "/jobs/",
        json={
            "title": "Incomplete Job",
            "company": "Some Company",
        },
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 422


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


def test_list_jobs_with_location_filter(client: TestClient, test_job: Job):
    response = client.get("/jobs/?location=Test")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == test_job.title


def test_get_job(client: TestClient, test_job: Job):
    response = client.get(f"/jobs/{test_job.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == test_job.title


def test_get_job_nonexistent(client: TestClient):
    response = client.get("/jobs/999")
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Job not found"
