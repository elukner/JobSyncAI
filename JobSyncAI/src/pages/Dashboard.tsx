import Navigation from '../components/auth/Navigation';

export default function Dashboard() {
  return (
    <Navigation>
      {/* Anything you type here automatically goes into the <main> section! */}
      <h1 className="text-center pt-4 text-3xl">Welcome to the Dashboard!</h1>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="card border p-4">Stats Card 1</div>
        <div className="card border p-4">Stats Card 2</div>
        <div className="card border p-4">Main JobSync AI Content Area</div>
      </div>
    </Navigation>
  );
}