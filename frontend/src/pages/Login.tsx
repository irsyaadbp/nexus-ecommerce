import { Button } from "../components/ui/button";

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 glass-card p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2">Please enter your details to login</p>
                </div>
                <form className="space-y-4">
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
                    <Button className="w-full">Sign In</Button>
                </form>
                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-primary hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
