import { Link, Navigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-svh flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="min-h-[calc(100svh-64px-600px)] flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 glass-card p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Join us to start shopping</p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <Input
                            type="text"
                            placeholder="johndoe"
                            className="mt-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            className="mt-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="mt-2"
                        />
                    </div>
                    <Button className="w-full">Register</Button>
                </form>
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
