import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '../components/auth/Navigation';
import { AddJobSheet } from '@/components/jobs/AddJobSheet';
import { supabase } from '@/lib/supabase';
import { UserAuth } from '@/contexts/AuthContext';
import type { createClient, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { use, useEffect, useState } from 'react';


// Define the shape of our data
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
      <span className={isExpanded ? "text-muted-foreground" : "line-clamp-3 text-muted-foreground"}>
        {text}
      </span>
      {/* Only show the button if the text is relatively long */}
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
 * Dashboard component that displays the main application interface.
 * Renders a welcome heading and a grid layout containing statistics cards
 * and the primary JobSync AI content area.
 */
export default function Dashboard() {
 const { user } = UserAuth();
  // 1. Give your state a type and an empty array to start!
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


    // 2. Put the radio INSIDE the useEffect so it only turns on once
    const channel = supabase
      .channel('jobs_channel') // Name it whatever you want
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'jobs',
        },
        (payload) => {
          console.log('New Job detected!', payload.new);
          // 3. Add the new job to the top of the existing list
          setJobs((prevJobs) => [payload.new as JobApplication, ...prevJobs]);
        }
      )
      .subscribe();

    // 4. Clean up the exact channel you just created when the user leaves the page
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array means "run once on load"

  return (
    <Navigation>
      <h1 className="text-center pt-4 text-3xl">Welcome to the Dashboard!</h1>
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

