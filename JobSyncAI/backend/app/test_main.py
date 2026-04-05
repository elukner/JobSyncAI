from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.main import app

client = TestClient(app)


@patch("app.main.client.chat.completions.create")
def test_analyze_job_match(mock_create):
    mock_response = MagicMock()
    mock_response.choices[0].message.content = {
        "choices": [{"message": {"content": "This is the mocked response text."}}]
    }
