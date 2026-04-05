import { useState } from "react";
import { Button } from '@/components/ui/button';
import { fetchAIAnalysis } from '@/lib/api';
import { getScoreColor } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { Badge } from "../ui/badge";


interface JobCardProps {
    job: any;

}

export function JobCard({ job }: JobCardProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [matchScore, setMatchScore] = useState(0);
    const [missingKeywords, setMissingKeywords] = useState<string[]>([]);

    async function handleAnalyzeClick() {
        setIsAnalyzing(true)
        try {
            const data = await fetchAIAnalysis("I am a React dev", job.description)
            setMatchScore(data.match_score)
            setMissingKeywords(data.missing_keywords)
        } catch (error) {
            console.error("Fetch failed", error)
        } finally {
            setIsAnalyzing(false)
        }

    }
    return (

        <div>
            {job.title}
            {job.company}
            <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnalyzeClick()}
            >
                {isAnalyzing ? "Analyzing..." : "Analyze Match"}
            </Button>
            {matchScore > 0 && (
                <div className="mt-4 space-y-2">
                    <p className={getScoreColor(matchScore)}>
                        Match Score: {matchScore}/100
                    </p>
                    <Progress value={matchScore} />
                    {missingKeywords.map((missingKeyword) => (
                        <Badge key={missingKeyword} variant="secondary">{missingKeyword}</Badge>
                    ))}
                </div>
            )}

        </div>

    )
}