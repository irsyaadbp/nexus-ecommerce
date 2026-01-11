import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useUserMe = () => {
    return useQuery({
        queryKey: ['user-me'],
        queryFn: authService.getUserMe,
        retry: false,
        enabled: !!localStorage.getItem('token'),
    });
};

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.userLogin,
        onSuccess: (response) => {
            localStorage.setItem('token', response.data.token);
            queryClient.invalidateQueries({ queryKey: ['user-me'] });
            toast.success("Logged in successfully");
            navigate('/');
        },
        onError: (error: Error) => {
            console.log(error)
            toast.error(error.message || "Invalid credentials");
        }
    });
};


export const useLogoutUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.logoutUser,
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
};

export const useAuth = () => {
    const { data: userProfile, isLoading: isProfileLoading } = useUserMe();
    const loginMutation = useLoginUser();
    const logoutMutation = useLogoutUser();

    return {
        user: userProfile?.data,
        isAuthenticated: !!userProfile?.data,
        isLoading: isProfileLoading || loginMutation.isPending || logoutMutation.isPending,
        login: loginMutation,
        logout: logoutMutation,
    };
};
