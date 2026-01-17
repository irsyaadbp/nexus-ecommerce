import { Link, Navigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";

export default function Register() {
    const { isAuthenticated, isLoading: authLoading, register: registerMutation } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    // Determine if form interacts with the API
    const isSubmitting = registerMutation.isPending;

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data);
    };

    if (authLoading && !isSubmitting) { // Avoid full screen loader when submitting form if it shares isLoading
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
        <div className="min-h-[calc(100svh-64px-600px)] flex items-center justify-center bg-background p-4 mt-20">
            <div className="w-full max-w-md space-y-8 glass-card p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Join us to start shopping</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <Input
                            {...register("username")}
                            type="text"
                            placeholder="johndoe"
                            className="mt-2"
                        />
                        {errors.username && (
                            <p className="text-xs text-destructive">{errors.username.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="name@example.com"
                            className="mt-2"
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className="mt-2"
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Account..." : "Register"}
                    </Button>
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
