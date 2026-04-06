export async function fetchAIAnalysis(resumeText: string, jobDescription: string) {

    const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const url = `${baseUrl}/api/analyze`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            resume_text: resumeText,
            job_description: jobDescription
        })
    });

    if (!response.ok) {
        throw new Error(`Server crashed! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}