from openai import OpenAI
from lib.functions.queue import Queue
import os
import json
from dotenv import load_dotenv
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
               You are a mental health chatbot that provides mental health advice and analyzes physiological data below.

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
    status_name: ["normal", "critical", "warning", "info"]  
    reason: str
    recommendation: str
    metric_value: float
    timeframe: str
    color_code: Literal["normal", "critical", "warning", "info"]  
Field Breakdown:
metric_name → The type of physiological metric. [blood pressure, temperature, blood oxygen, heart rate]

status_name → summary of the condition

reason → Explanation for the assigned status.

recommendation → Suggested action based on analysis.

metric_value → The actual float value of the metric. which is the average for the metric_name

timeframe → The period over which the metric was measured.

color_code → Literal["normal", "critical", "warning", "info"]

you can return either of the two types of responses, json of data: str  or data: Insight
Behavior:
If the input contains only text, return it as-is.
If the input contains physiological data, analyze it and return structured insights in JSON format. not for each one tho like just summary of everything so ouput should just be one object
return the most important metric.
If the input is not related to mental health or physiological analysis, do not respond.
return a json called that has data and type in it, it should be either text or insight in the type and i'll know what is inside of it. i should be able to use json.loads on that dictionary to get it.

This ensures you handle both free-form text and structured health data appropriately. format the text properly so it won't have things like * but just text. 🚀
[
    {
        "heart_rate": 85,
        "timestamp": "2025-02-10T14:30:00"
    },
    {
        "heart_rate": 95,
        "blood_pressure": "130/85",
        "temperature": 37.2,
        "blood_oxygen": 98,
        "timestamp": "2025-02-11T09:15:00"
    },
    {
        "heart_rate": 72,
        "blood_pressure": "120/80",
        "temperature": 36.5,
        "blood_oxygen": 99,
        "timestamp": "2025-02-12T22:45:00"
    },
    {
        "heart_rate": 110,
        "blood_pressure": "145/90",
        "temperature": 38.1,
        "blood_oxygen": 96,
        "timestamp": "2025-02-13T08:20:00"
    },
    {
        "heart_rate": 78,
        "blood_pressure": "118/76",
        "temperature": 36.8,
        "blood_oxygen": 97,
        "timestamp": "2025-02-13T14:10:00"
    },
    {
        "heart_rate": 105,
        "blood_pressure": "140/88",
        "temperature": 37.8,
        "blood_oxygen": 95,
        "timestamp": "2025-02-14T16:00:00"
    },
    {
        "heart_rate": 60,
        "blood_pressure": "110/70",
        "temperature": 36.4,
        "blood_oxygen": 99,
        "timestamp": "2025-02-14T19:30:00"
    },
    {
        "heart_rate": 89,
        "blood_pressure": "125/82",
        "temperature": 36.9,
        "blood_oxygen": 98,
        "timestamp": "2025-02-15T07:45:00"
    },
    {
        "heart_rate": 115,
        "blood_pressure": "150/95",
        "temperature": 39.2,
        "blood_oxygen": 94,
        "timestamp": "2025-02-15T23:10:00"
    },
    {
        "heart_rate": 75,
        "blood_pressure": "122/78",
        "temperature": 37.0,
        "blood_oxygen": 98,
        "timestamp": "2025-02-16T03:50:00"
    },
    {
        "heart_rate": 65,
        "blood_pressure": "115/74",
        "temperature": 36.6,
        "blood_oxygen": 99,
        "timestamp": "2025-02-16T12:05:00"
    },
    {
        "heart_rate": 92,
        "blood_pressure": "128/83",
        "temperature": 37.1,
        "blood_oxygen": 97,
        "timestamp": "2025-02-17T15:25:00"
    },
    {
        "heart_rate": 88,
        "blood_pressure": "124/80",
        "temperature": 36.7,
        "blood_oxygen": 98,
        "timestamp": "2025-02-18T08:40:00"
    },
    {
        "heart_rate": 102,
        "blood_pressure": "138/87",
        "temperature": 38.0,
        "blood_oxygen": 96,
        "timestamp": "2025-02-18T21:30:00"
    },
    {
        "heart_rate": 70,
        "blood_pressure": "118/75",
        "temperature": 36.5,
        "blood_oxygen": 99,
        "timestamp": "2025-02-19T05:55:00"
    },
    {
        "heart_rate": 97,
        "blood_pressure": "132/85",
        "temperature": 37.3,
        "blood_oxygen": 97,
        "timestamp": "2025-02-19T17:20:00"
    },
    {
        "heart_rate": 80,
        "blood_pressure": "120/78",
        "temperature": 36.8,
        "blood_oxygen": 98,
        "timestamp": "2025-02-20T11:45:00"
    },
    {
        "heart_rate": 108,
        "blood_pressure": "142/89",
        "temperature": 38.4,
        "blood_oxygen": 95,
        "timestamp": "2025-02-20T22:10:00"
    },
    {
        "heart_rate": 90,
        "blood_pressure": "127/81",
        "temperature": 37.0,
        "blood_oxygen": 98,
        "timestamp": "2025-02-21T14:30:00"
    },
    {
        "heart_rate": 76,
        "blood_pressure": "121/79",
        "temperature": 36.7,
        "blood_oxygen": 99,
        "timestamp": "2025-02-22T06:00:00"
    }
]

                """
        }
        self.settings = {
            'response_format': {
                'type': 'text'
            },
            # 'model': 'gpt-4o',
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
            # **self.settings,
        )
        print(response)
        return extract_json(response.choices[0].message.content)
        return response['choices'][0]['message']['content']
    
    def prepare_input(self, message):
        if type(message.content) != str:
            message = json.dumps(message.content.model_dump())
        role = "assistant" if message.is_ai else "user"
        # return  {"role": role,"content": ["type": "text","text": message.content]}
        return {"role": role, "content": [{"type": "text", "text": message.content}]}
