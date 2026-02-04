from fastapi.testclient import TestClient

from app.models import Employer


def test_register_employer(client: TestClient):
    response = client.post(
        "/employers/register",
        json={
            "name": "New Employer",
            "email": "new@example.com",
            "password": "password123",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "new@example.com"


def test_register_employer_duplicate(client: TestClient, employer: Employer):
    response = client.post(
        "/employers/register",
        json={
            "name": "New Employer",
            "email": employer.email,
            "password": "password123",
        },
    )
    assert response.status_code == 400


def test_login_employer(client: TestClient, employer: Employer):
    response = client.post(
        "/employers/login",
        json={"email": employer.email, "password": "password123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert data["employer"]["email"] == employer.email


def test_login_employer_invalid(client: TestClient):
    response = client.post(
        "/employers/login",
        json={"email": "missing@example.com", "password": "password123"},
    )
    assert response.status_code == 401
