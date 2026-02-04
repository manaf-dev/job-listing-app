from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_logger
from .db import init_db
from .routes import auth_router, router

logger = get_logger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)


@app.on_event("startup")
def on_startup():
    logger.info("Starting the Job Listing API...")

    init_db()
    logger.info("Database initialized")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Listing API"}
