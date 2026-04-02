import React, { useState, type ReactNode } from 'react';
import { UserAuth } from '../../contexts/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';

interface NavigationProps {
    children: ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
    const { signOut } = UserAuth();
    const menuItems = ['Dashboard', 'Analytics', 'Users', 'Settings'];
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <h2>Admin</h2>
                <ul>
                    {menuItems.map(item => (
                        <li key={item}>
                            <NavLink
                                to={`/${item.toLowerCase()}`}
                                className={({ isActive }) => isActive ? 'active font-bold text-blue-600' : ''}
                            >
                                {item}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Main Content Area (Header + The Page Content) */}
            <div className="main-content">
                <header className="header">
                    <h1>{location.pathname}</h1>
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