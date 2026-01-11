import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { Logo } from "@/components/Logo";

export default function AdminLogin() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center bg-background p-4">
            <Logo className="fixed top-10 !text-3xl" />
            <div className="w-full max-w-md space-y-8 glass-card p-8 mt-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Admin Login</h1>
                    <p className="text-muted-foreground mt-2">Enter credentials to access dashboard</p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            placeholder="admin@nexus.com"
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
                    <Button className="w-full">Login as Admin</Button>
                </form>
            </div>
        </div>
    );
}
