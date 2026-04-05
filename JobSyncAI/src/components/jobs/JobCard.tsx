import { useState } from "react";
import { Button } from '@/components/ui/button';
import { fetchAIAnalysis } from '@/lib/api';


interface JobCardProps {
    jobDescription: string;

}

export function JobCard({ jobDescription }: JobCardProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [matchScore, setMatchScore] = useState(0);
    async function handleAnalyzeClick() {
        setIsAnalyzing(true)
        try {
            const data = await fetchAIAnalysis("I am a React dev", jobDescription)
            setMatchScore(data.match_score)
        } catch (error) {
            console.error("Fetch failed", error)
        } finally {
            setIsAnalyzing(false)
        }

    }
    return (

        <div>
            {jobDescription}
            <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnalyzeClick()}
            >
                {isAnalyzing ? "Analyzing..." : "Analyze Match"}
            </Button>
            {matchScore > 0 && <p>Match Score: {matchScore}/100</p>}
        </div>

    )
}