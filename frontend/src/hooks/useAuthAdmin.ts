import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import type { LoginInput } from "../types/auth.types";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useAdminMe = () => {
    return useQuery({
        queryKey: ['admin-me'],
        queryFn: authService.getAdminMe,
        retry: false,
        enabled: !!localStorage.getItem('token'),
    });
};

export const useLoginAdmin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: LoginInput) => authService.adminLogin(data),
        onSuccess: (response) => {
            localStorage.setItem('token', response.data.token);
            queryClient.setQueryData(['admin-me'], { data: response.data.user });
            toast.success("Login successful");
            navigate('/admin');
        },
        onError: (error: Error) => {
            toast.error(error.message || "Login failed");
        }
    });
};

export const useLogoutAdmin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.logoutAdmin,
        onSuccess: () => {
            localStorage.removeItem('token');
            queryClient.clear();
            toast.success("Logged out successfully");
            navigate('/admin/login');
        },
        onSettled: () => {
            localStorage.removeItem('token');
            queryClient.clear();
            navigate('/admin/login');
        }
    });
};

export const useAuthAdmin = () => {
    const { data: adminProfile, isLoading: isProfileLoading } = useAdminMe();
    const loginMutation = useLoginAdmin();
    const logoutMutation = useLogoutAdmin();

    return {
        admin: adminProfile?.data,
        isAuthenticated: !!adminProfile?.data && adminProfile.data.role === 'ADMIN',
        isLoading: isProfileLoading || loginMutation.isPending || logoutMutation.isPending,
        login: loginMutation,
        logout: logoutMutation,
    };
};
