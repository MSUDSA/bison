from pydantic import BaseModel
from typing import Optional, Literal

class Vital_types(BaseModel):
  heart_rate = float
  blood_pressure: float
  temperature = float                            
  blood_oxygen = float
