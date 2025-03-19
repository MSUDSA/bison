from pydantic import BaseModel
from typing import Optional, Literal
from lib.enums import *

class MentalHealth(BaseModel):
    concern: CONCERN
    mood: FEELING
    sleep_duration: int
    sleep_quality: FEELING
    trouble_sleeping: EXPERIENCE
    lifestyle_factors: LIFESTYLEFACTOR
    
    pass