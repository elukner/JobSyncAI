from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from openai import OpenAI
import json

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1", api_key=os.getenv("OPENROUTER_API_KEY")
)


app = FastAPI()


class MatchRequest(BaseModel):
    resume_text: str
    job_description: str


@app.post("/api/analyze")
async def analyze_job_match(request: MatchRequest):
    messages = [
        {
            "role": "system",
            "content": 'You are a recruiter. You strictly return JSON formatted like {"match_score": 0, "missing_keywords": []}.',
        },
        {
            "role": "user",
            "content": f"Here is the resume: {request.resume_text} and the job: {request.job_description}",
        },
    ]
    response = client.chat.completions.create(
        model="qwen/qwen3.6-plus:free", messages=messages
    )
    the_ai_string = response.choices[0].message.content
    print("DEBUG - RAW AI OUTPUT:", the_ai_string)
    clean_json_string = the_ai_string.replace("```json", "").replace("```", "").strip()
    parsed_data = json.loads(clean_json_string)
    return parsed_data
