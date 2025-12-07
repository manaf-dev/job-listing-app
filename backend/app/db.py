from decouple import config
from sqlmodel import Session, SQLModel, create_engine

DB_URL = config("DB_URL", "sqlite:///jobs.db")
engine = create_engine(DB_URL, echo=False)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
