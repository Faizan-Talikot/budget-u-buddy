import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { getUserData, logout } from "@/lib/api";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

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
        }
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate("/");
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
                        <span className="text-sm font-medium">Welcome, {userName}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
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