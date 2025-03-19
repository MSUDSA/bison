from pydantic import BaseModel

class Location(BaseModel):
    address: str
    long: float
    lat: float
