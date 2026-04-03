import Navigation from '../components/auth/Navigation';

// Define the shape of our data
interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  dateApplied: string;
}

// The Mock Data Array
const mockJobs: JobApplication[] = [
  {
    id: '1',
    company: 'Stripe',
    role: 'Frontend Engineer',
    status: 'Interviewing',
    dateApplied: '2026-03-28',
  },
  {
    id: '2',
    company: 'Vercel',
    role: 'Full Stack Developer',
    status: 'Applied',
    dateApplied: '2026-04-01',
  },
  {
    id: '3',
    company: 'OpenAI',
    role: 'Software Engineer, UI',
    status: 'Rejected',
    dateApplied: '2026-03-15',
  },
  {
    id: '4',
    company: 'Spotify',
    role: 'React Developer',
    status: 'Offer',
    dateApplied: '2026-03-10',
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
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="card border p-4">Stats Card 1</div>
        <div className="card border p-4">Stats Card 2</div>
        <div className="card border p-4">Main JobSync AI Content Area</div>
      </div>
    </Navigation>
  );
}