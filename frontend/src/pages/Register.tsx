import { Button } from "../components/ui/button";

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 glass-card p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Join us to start shopping</p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="johndoe"
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <Button className="w-full">Register</Button>
                </form>
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
