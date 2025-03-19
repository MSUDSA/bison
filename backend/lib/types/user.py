from pydantic import BaseModel
from typing import Optional, Literal



class SignupCredential(BaseModel):
    name: str
    email: str
    age: int
    gender: Literal['man', 'woman', 'other']
    occupation: Optional[str] = None
    college: Optional[str] = None
    dob: str

# write a date validator function
class LoginCredential(BaseModel):
    pass