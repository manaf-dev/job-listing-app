# Job Listing Application

This is a full-stack job listing application with a Python FastAPI backend and a React frontend.

## Features

- **Backend (FastAPI):**
  - RESTful API for managing job listings.
  - Database integration (SQLAlchemy, SQLite by default).
- **Frontend (React):**
  - User interface for viewing, creating, and managing job listings.
  - Components for job cards, lists, and forms.

## Setup

To get the application up and running, follow these steps:

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv .venv
    ./.venv/Scripts/activate  # On Windows
    # source .venv/bin/activate # On macOS/Linux
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the FastAPI application:
    ```bash
    uvicorn app.main:app --reload
    ```
    The backend will be accessible at `http://127.0.0.1:8000`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the React development server:
    ```bash
    npm run dev
    ```
    The frontend will typically be accessible at `http://localhost:5173` (or similar).

## Project Structure

- `backend/`: Contains the FastAPI backend application.
- `frontend/`: Contains the React frontend application.
- `.github/workflows/`: GitHub Actions for CI/CD.