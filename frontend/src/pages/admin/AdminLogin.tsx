import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { Logo } from "@/components/Logo";
import { useLoginAdmin, useAuthAdmin } from "../../hooks/useAuthAdmin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";
import { Navigate } from "react-router";

export default function AdminLogin() {
    const { isAuthenticated, isLoading } = useAuthAdmin();
    const { mutate, isPending } = useLoginAdmin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    if (isLoading) {
        return (
            <div className="min-h-svh flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    // API errors are handled by useLoginAdmin hook's toast
    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };

    return (
        <div className="min-h-svh flex flex-col items-center justify-center bg-background p-4">
            <Logo className="fixed top-10 !text-3xl" />
            <div className="w-full max-w-md space-y-8 glass-card p-8 mt-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Admin Login</h1>
                    <p className="text-muted-foreground mt-2">Enter credentials to access dashboard</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            placeholder="admin@nexus.com"
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
                    <Button className="w-full" disabled={isPending} type="submit">
                        {isPending ? "Logging in..." : "Login as Admin"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
