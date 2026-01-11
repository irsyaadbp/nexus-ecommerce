import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link, Navigate } from "react-router";
import { useAuth, useLoginUser } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

export default function Login() {
    const { isAuthenticated, isLoading } = useAuth();
    const { mutate, isPending } = useLoginUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };

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
        <div className="min-h-[calc(100vh-64px-600px)] flex flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 glass-card p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2">Please enter your details to login</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            className={`mt-2 ${errors.email ? "border-destructive" : ""}`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className={`mt-2 ${errors.password ? "border-destructive" : ""}`}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
                Are you an admin?{" "}
                <Link to="/admin/login" className="text-primary hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
}
