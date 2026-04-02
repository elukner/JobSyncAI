import React, { useState, type ReactNode } from 'react';
import { UserAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  children: ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const { signOut } = UserAuth();
  const menuItems = ['Dashboard', 'Analytics', 'Users', 'Settings'];

  const handleSignOut = async () => {
    // 1. You found the bug! No manual navigation needed here anymore.
    await signOut(); 
  };

  return (
    <div className="dashboard-container">
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

      {/* Main Content Area (Header + The Page Content) */}
      <div className="main-content">
        <header className="header">
          <h1>{activeItem}</h1>
          <button
            onClick={handleSignOut} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </header>

        {/* This is the magic part. It injects the Dashboard content right here! */}
        <main className="content-area">
          {children} 
        </main>
      </div>
    </div>
  );
}