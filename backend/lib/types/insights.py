from pydantic import BaseModel
from typing import Literal

class Insight(BaseModel):
  metric_name: Literal["heart rate", "blood pressure", "temperature", "blood oxygen"]
  status_name: str
  reason: str
  recommendation: str
  metric_value: int
  timeframe: str
  color_code: str