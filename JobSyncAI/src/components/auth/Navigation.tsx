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
        <div className="min-h-screen bg-slate-50">
            <header className="sticky top-0 z-50 w-full border-b bg-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        <Link to="/dashboard" className="text-xl font-bold tracking-tight text-primary">
                            JobSync AI
                        </Link>
                        <nav className="flex items-center gap-6">
                            <Link
                                to="/dashboard"
                                className={`text-sm font-medium transition-colors hover:text-primary 
                                    ${location.pathname
                                        === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}
                            >
                                Dashboard
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-slate-200">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <p className="text-xs leading-none text-muted-foreground">My Account</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/profile')}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Profile Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">
                {children}
            </main>
        </div>
    );
}