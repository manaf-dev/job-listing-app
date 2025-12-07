from fastapi import FastAPI

from .db import init_db
from .routes import router

app = FastAPI()

app.include_router(router)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Listing API"}
