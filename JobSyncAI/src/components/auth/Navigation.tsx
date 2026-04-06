import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";

export default function Navigation({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="sidebar">
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