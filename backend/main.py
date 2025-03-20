from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from config import Config
from state import ApplicationState
from db import Database, Cache
from contextlib import asynccontextmanager
from routes import user_router, auth_router, msg_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    api.set_db(Database())
    api.set_cache(Cache())
    await api.initialize()
    yield
    await api.db.disconnect()

api = ApplicationState()

app = FastAPI(lifespan=lifespan)

app.add_middleware(SessionMiddleware, secret_key=Config.SECRET_KEY, max_age=3600)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def root():
    return {"data": "Hello World"}


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(msg_router)