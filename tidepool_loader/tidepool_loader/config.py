from pydantic import BaseSettings
from dotenv import load_dotenv, find_dotenv


class Settings(BaseSettings):
    base64_auth: str


load_dotenv(find_dotenv())

settings = Settings()
