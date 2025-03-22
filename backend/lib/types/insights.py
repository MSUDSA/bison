from pydantic import BaseModel
from typing import Optional, Literal

class Insights(BaseModel):
  metric_name: Literal["heart rate", "blood pressure", "temperature", "blood oxygen"]
  status_name: Literal['normal', 'critical', 'warning', 'info']
  reason: str
  recommendation: str
  metric_value: int
  timeframe: str
  color_code: str