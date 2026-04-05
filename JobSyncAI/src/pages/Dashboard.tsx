import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '../components/auth/Navigation';
import { AddJobSheet } from '@/components/jobs/AddJobSheet';
import { supabase } from '@/lib/supabase';
import { UserAuth } from '@/contexts/AuthContext';
import type { createClient, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { use, useEffect, useState } from 'react';
import { JobCard } from '@/components/jobs/JobCard';


interface JobApplication {
  id: string;
  user_id: string;
  company: string;
  title: string;
  url: string | null;
  description: string | null;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  created_at: string;
  updated_at: string;
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
 * Dashboard component that displays a list of job applications with real-time updates.
 * 
 * Fetches all job applications from the database on mount and displays them in a responsive grid.
 * Subscribes to database changes to automatically add new jobs to the dashboard when they are inserted.
 * 
 * @component
 * @returns {JSX.Element} A navigation-wrapped dashboard containing job application cards with company name,
 * job title, status, URL, description, and application date for each job.
 * 
 * @requires UserAuth - Custom hook to get the current user
 * @requires supabase - Supabase client for database queries and real-time subscriptions
 * 
 * @example
 * ```tsx
 * <Dashboard />
 * ```
 */
export default function Dashboard() {
  const { user } = UserAuth();
  const [jobs, setJobs] = useState<JobApplication[]>([]);

  useEffect(() => {
    const fetchjobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setJobs(data);
    };

    fetchjobs();



    const channel = supabase
      .channel('jobs_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'jobs',
        },
        (payload) => {
          console.log('New Job detected!', payload.new);
          setJobs((prevJobs) => [payload.new as JobApplication, ...prevJobs]);
        }
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Navigation>
      <h1 className="text-center pt-4 text-3xl">Welcome to the Dashboard!</h1>

      <div className="flex-1 p-6">
        <JobCard jobDescription="We need a Senior Frontend Developer with 5 years of React and TypeScript experience." />
      </div>
      <AddJobSheet />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className='max-w-md'>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </Navigation>
  );
}

