import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { getUserData, logout } from "@/lib/api";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userInitials, setUserInitials] = useState("");

    // Check if user is logged in (has token)
    useEffect(() => {
        const token = localStorage.getItem("budgetu-token");
        if (!token) {
            navigate("/");
            return;
        }

        // Get user data from localStorage
        const userData = getUserData();
        if (userData) {
            setUserName(`${userData.firstName} ${userData.lastName}`);
            setUserInitials(`${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`);
        }
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Handle navigation to settings
    const handleNavigateToSettings = () => {
        navigate("/settings");
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-budgetu-purple rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="font-bold text-xl">BudgetU</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-budgetu-purple text-white">
                                            {userInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:inline">{userName}</span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleNavigateToSettings} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-12">
                <div className="text-center p-8 max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Welcome to BudgetU</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Your dashboard is coming soon. Stay tuned for budget management features.
                    </p>
                    <div className="p-12 rounded-lg border bg-card text-card-foreground shadow">
                        <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
                        <p className="text-muted-foreground mb-6">
                            Soon you'll be able to create budgets, track expenses, and receive real-time spending guidance.
                        </p>
                        <div className="grid gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-budgetu-purple/20 flex items-center justify-center">
                                    <span className="font-bold">1</span>
                                </div>
                                <span>Create your monthly budget</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-budgetu-purple/20 flex items-center justify-center">
                                    <span className="font-bold">2</span>
                                </div>
                                <span>Connect your bank accounts</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-budgetu-purple/20 flex items-center justify-center">
                                    <span className="font-bold">3</span>
                                </div>
                                <span>Track your expenses</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard; 