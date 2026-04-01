import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = ['Dashboard', 'Analytics', 'Users', 'Settings'];

  return (
    <div className="dashboard-container">
    <h1 className="text-center pt-4 text-3xl">Welcome to the Dashboard!</h1>
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Admin</h2>
        <ul>
          {menuItems.map(item => (
            <li 
              key={item} 
              className={activeItem === item ? 'active' : ''}
              onClick={() => setActiveItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>{activeItem}</h1>
          <button>Logout</button>
        </header>

        <main className="content-area">
          <div className="card">Stats Card 1</div>
          <div className="card">Stats Card 2</div>
          <div className="card">Main Content Area</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
