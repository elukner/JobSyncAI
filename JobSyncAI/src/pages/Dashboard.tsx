import Navigation from '../components/auth/Navigation';

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