from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str

@app.post("/api/analyze")

async def create_item(matchRequest:MatchRequest):
    return{"status": "success", "score": 85}


