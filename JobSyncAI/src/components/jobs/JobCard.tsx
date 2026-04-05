import { useState } from "react";
import { Button } from '@/components/ui/button';
import { fetchAIAnalysis } from '@/lib/api';
import { getScoreColor } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


interface JobCardProps {
    job: any;

}

function ExpandableDescription({ text }: { text: string | null }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return <span>None</span>;

    return (
        <div className="inline-flex flex-col items-start">
            <span className={isExpanded ? "text-muted-foreground break-all" : "line-clamp-3 text-muted-foreground break-all"}>
                {text}
            </span>
            {text.length > 100 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs font-medium text-primary hover:underline mt-1"
                >
                    {isExpanded ? "Show Less" : "Read More"}
                </button>
            )}
        </div>
    );
}

/**
 * Renders a job card component displaying job details with AI-powered match analysis.
 * 
 * @component
 * @param {JobCardProps} props - The component props
 * @param {Job} props.job - The job object containing company, title, description, status, url, and created_at
 * @returns {React.ReactElement} A card element displaying job information and match analysis results
 */
export function JobCard({ job }: JobCardProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [matchScore, setMatchScore] = useState(job.match_score || 0);
    const [missingKeywords, setMissingKeywords] = useState<string[]>(job.missing_keywords || []);

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
        <Card className='max-w-md'>
            <CardHeader>
                <CardTitle>{job.company}</CardTitle>
                <CardDescription>{job.title}</CardDescription>
            </CardHeader>
            <CardContent className='text-sm'>
                <ol className='mt-4 flex list-decimal flex-col gap-2 pl-6'>
                    <li>Status: {job.status}</li>
                    <li>URL: {job.url}</li>
                    <li>Description: <ExpandableDescription text={job.description} /></li>
                    <li>Applied: {new Date(job.created_at).toLocaleDateString()}</li>
                </ol>
                <div className="mt-6 flex flex-col gap-4">
                    <div>
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
                </div>

            </CardContent>
        </Card>
    );

}