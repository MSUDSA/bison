from pydantic import BaseModel

class VitalType(BaseModel):
  heart_rate = float
  blood_pressure: float
  temperature = float                            
  blood_oxygen = float
