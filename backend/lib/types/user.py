from pydantic import BaseModel
from typing import Optional, Literal
from lib.enums.gender import Gender



class SignupCredential(BaseModel):
    name: str
    email: str
    age: int
    gender: Gender
    password: str
    occupation: Optional[str] = None
    college: Optional[str] = None
    dob: str

# write a date validator function
class LoginCredential(BaseModel):
    email: str
    password: str