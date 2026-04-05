import React, { useState, type ReactNode } from 'react';
import { UserAuth } from '../../contexts/AuthContext';
import { NavLink, useLocation, Link } from 'react-router-dom';

interface NavigationProps {
    children: ReactNode;
}

/**
 * Navigation layout component that provides a sidebar menu and header with authentication controls.
 * Renders a dashboard layout with navigation links and displays the current page title based on the route.
 * 
 * @component
 * @param {NavigationProps} props - Component props
 * @param {React.ReactNode} props.children - Page content to render in the main content area
 * @returns {JSX.Element} The dashboard layout with sidebar navigation and main content area
 */
export default function Navigation({ children }: NavigationProps) {
    const { signOut } = UserAuth();
    const menuItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Users', path: '/users' },
        { label: 'Settings', path: '/profile' }
    ];
    const location = useLocation();

    // Derive the header title from the current URL path 
    const cleanPath = location.pathname.replace('/', '');
    const displayTitle = cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="dashboard-container">
            <nav className="sidebar">
                <h2>Admin</h2>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.label}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? 'active font-bold text-primary' : 'text-muted-foreground hover:text-primary'}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="main-content">
                <header className="header">
                    <h1>{displayTitle}</h1>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </header>
                <main className="content-area">
                    {children}
                </main>
            </div>
        </div>
    );
}