import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '../components/auth/Navigation';
import { AddJobSheet } from '@/components/jobs/AddJobSheet';

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

// The Mock Data Array
const mockJobs: JobApplication[] = [
  {
    id: '1',
    user_id: 'user-123', // Every job needs an owner!
    company: 'Stripe',
    title: 'Frontend Engineer',
    status: 'Interviewing',
    url: 'https://stripe.com/jobs/123',
    description: 'Working on the checkout UI.',
    created_at: '2026-03-28T10:00:00Z', // Matches Supabase timestamptz format
    updated_at: '2026-03-28T10:00:00Z',
  },
  {
    id: '2',
    user_id: 'user-123',
    company: 'Vercel',
    title: 'Full Stack Developer',
    status: 'Applied',
    url: null, // Optional fields can be null
    description: null,
    created_at: '2026-04-01T14:30:00Z',
    updated_at: '2026-04-01T14:30:00Z',
  },
  {
    id: '3',
    user_id: 'user-123',
    company: 'OpenAI',
    title: 'Software Engineer, UI',
    status: 'Rejected',
    url: 'https://openai.com/careers',
    description: 'Building the future of AI interfaces.',
    created_at: '2026-03-15T09:15:00Z',
    updated_at: '2026-03-15T09:15:00Z',
  },
  {
    id: '4',
    user_id: 'user-123',
    company: 'Spotify',
    title: 'React Developer',
    status: 'Offer',
    url: null,
    description: 'Developing the Web Player experience.',
    created_at: '2026-03-10T11:00:00Z',
    updated_at: '2026-03-10T11:00:00Z',
  }
];


/**
 * Dashboard component that displays the main application interface.
 * Renders a welcome heading and a grid layout containing statistics cards
 * and the primary JobSync AI content area.
 */
export default function Dashboard() {
  return (
    <Navigation>
      <h1 className="text-center pt-4 text-3xl">Welcome to the Dashboard!</h1>
      <AddJobSheet />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map((job) => (
          <Card key={job.id} className='max-w-md'>
            <CardHeader>
              <CardTitle>{job.company}</CardTitle>
              <CardDescription>{job.title}</CardDescription>
            </CardHeader>
            <CardContent className='text-sm'>
              <ol className='mt-4 flex list-decimal flex-col gap-2 pl-6'>
                <li>Status: {job.status}</li>                
                <li>URL: {job.url}</li>
                <li>Description: {job.description}</li>
                <li>Applied: {job.created_at}</li>
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>
    </Navigation>
  );
}