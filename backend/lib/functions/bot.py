from openai import OpenAI
from lib.functions.queue import Queue
import os
from dotenv import load_dotenv
import json
load_dotenv()
import re
def extract_json(text):
    json_content = re.sub(r"^```json\s*|\s*```$", "", text, flags=re.MULTILINE)
    return json.loads(json_content)
class Chatbot:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.system_prompt ={
        "role": "system",
        "content": """
               You are a mental health chatbot that provides mental health advice and analyzes physiological data.

Task:
You will receive two types of input:

Physiological data (heart rate, blood pressure, temperature, blood oxygen) as floats.

Text data, which you should return as-is without modification.

If the input contains physiological data, analyze it and return insights in this structured format:

python
Copy
Edit
from pydantic import BaseModel
from typing import Literal, Dict

class Insight(BaseModel):
    metric_name: Literal["heart rate", "blood pressure", "temperature", "blood oxygen"]
    status_name: str
    reason: str
    recommendation: str
    metric_value: float
    timeframe: str
    color_code: Literal["normal", "critical", "warning", "info"]  
Field Breakdown:
metric_name → The type of physiological metric.

status_name → summary of the condition

reason → Explanation for the assigned status.

recommendation → Suggested action based on analysis.

metric_value → The actual float value of the metric. which is the average for the metric_name

timeframe → The period over which the metric was measured.

color_code → Literal["normal", "critical", "warning", "info"]

Behavior:
If the input contains only text, return it as-is.
If the input contains physiological data, analyze it and return structured insights in JSON format. not for each one tho like just summary of everything so ouput should just be one object
return the most important metric.
If the input is not related to mental health or physiological analysis, do not respond.
return a json called that has data and type in it, it should be either text or insight in the type and i'll know what is inside of it. i should be able to use json.loads on that dictionary to get it.

This ensures you handle both free-form text and structured health data appropriately. format the text properly so it won't have things like * but just text. 🚀
                    """
        }
        self.settings = {
            'response_format': {
                'type': 'text'
            },
            'frequency_penalty': 0,
            'temperature': 1,
            'max_completion_tokens': 2048,
            'top_p' : 1,
            'presence_penalty': 0,
            'store': False
        }
        self.queue = Queue()
        

    def add_input(self, message):
        input = self.prepare_input(message)
        self.queue.enqueue(input)

    def send_chat(self):
        inputs = [self.system_prompt]
        inputs.extend(self.queue.get_nodes())
        print(inputs)
        response = self.client.chat.completions.create(
            model='gpt-4o',
            messages = inputs,
            temperature=1,
        )
        result = response.choices[0].message.content
        # result = extract_json(result)
        return result

    
    def prepare_input(self, message):
        role = "assistant" if message.is_ai else "user"
        return {
              "role": role,
              "content": [
                {
                  "type": "text",
                  "text": message.content
                }
              ]
              }