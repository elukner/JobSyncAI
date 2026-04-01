import React, { useState } from 'react';
import { UserAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'


const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const {signOut } = UserAuth()
  const menuItems = ['Dashboard', 'Analytics', 'Users', 'Settings']
  const Maps = useNavigate()
/**
 * TODO
 * @param e 
 */
  const handleSignOut = async (e: React.FormEvent) => {
    console.log("signOut:")
      await signOut() 
      Maps('/authForm')
  }

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
          <button
          onClick={handleSignOut} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
          Logout</button>
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
