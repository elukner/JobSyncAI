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
  match_score: string | null;
  missing_keywords: string | null;

}


/**
 * Dashboard component that displays a list of job applications.
 * 
 * Fetches all job applications from the database on component mount and displays them
 * in a responsive grid layout. Implements real-time updates using Supabase PostgreSQL
 * change subscriptions to listen for newly inserted job records.
 */
export default function Dashboard() {
  const { user } = UserAuth();
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [userResume, setUserResume] = useState<string>("");

  useEffect(() => {
    const fetchjobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setJobs(data);
    };

    fetchjobs();

    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('master_resume')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      if (data?.master_resume) {
        setUserResume(data.master_resume);
      }
    };
    fetchProfile();

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
  }, [user]);

  return (
    <Navigation>
      <AddJobSheet />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} userResume={userResume} />
        ))}
      </div>
    </Navigation>
  );
}

