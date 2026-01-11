import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: userProfile, isLoading: isProfileLoading } = useQuery({
        queryKey: ['user-me'],
        queryFn: authService.getUserMe,
        retry: false,
        enabled: !!localStorage.getItem('token'),
    });

    const logoutMutation = useMutation({
        mutationFn: authService.logoutAdmin, // For now reuse or check if there is user logout
        onSuccess: () => {
            localStorage.removeItem('token');
            queryClient.clear();
            toast.success("Logged out successfully");
            navigate('/login');
        },
        onSettled: () => {
            localStorage.removeItem('token');
            queryClient.clear();
            navigate('/login');
        }
    });

    return {
        user: userProfile?.data,
        isAuthenticated: !!userProfile?.data,
        isLoading: isProfileLoading || logoutMutation.isPending,
        logout: logoutMutation,
    };
};
