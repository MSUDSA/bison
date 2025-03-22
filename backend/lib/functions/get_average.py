from lib.types.vitaltype import VitalType
from typing import List
def get_average(lst: List[VitalType]):
  total_blood_pressure = 0
  total_blood_oxygen = 0
  total_heart_rate = 0
  total_temperature = 0
  for metric in lst:
    total_blood_oxygen += metric.blood_oxygen
    total_blood_pressure += metric.blood_pressure
    total_blood_pressure += metric.temperature 
    total_heart_rate += metric.heart_rate
  avg_blood_pressure = total_blood_pressure / len(lst)
  avg_blood_oxygen = total_blood_oxygen / len(lst)
  avg_heart_rate = total_heart_rate / len(lst)
  avg_temperature = total_temperature / len(lst)
  vital_obj = VitalType(heart_rate = avg_heart_rate, blood_pressure = avg_blood_pressure, temperature = avg_temperature, blood_oxygen = avg_blood_oxygen)
  return vital_obj

