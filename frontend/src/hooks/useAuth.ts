import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { SESSION_TOKEN_KEY } from "../lib/constants";
import { useAnalytic } from "./useAnalytic";

export const useUserMe = () => {
    return useQuery({
        queryKey: ['user-me'],
        queryFn: authService.getUserMe,
        retry: false,
        enabled: !!localStorage.getItem(SESSION_TOKEN_KEY),
    });
};

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const log = useAnalytic()

    return useMutation({
        mutationFn: authService.userLogin,
        onSuccess: (response) => {
            localStorage.setItem(SESSION_TOKEN_KEY, response.data.token);
            queryClient.invalidateQueries({ queryKey: ['user-me'] });
            toast.success("Logged in successfully");
            log.identify(response.data.user);
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
    const log = useAnalytic()

    return useMutation({
        mutationFn: authService.logoutUser,
        onSuccess: () => {
            localStorage.removeItem(SESSION_TOKEN_KEY);
            queryClient.clear();
            toast.success("Logged out successfully");
            log.identify();
            navigate('/login');
        },
        onSettled: () => {
            localStorage.removeItem(SESSION_TOKEN_KEY);
            queryClient.clear();
            navigate('/login');
        }
    });
};

export const useRegisterUser = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.userRegister,
        onSuccess: () => {
            toast.success("Account created successfully! Please login.");
            navigate('/login');
        },
        onError: (error: Error) => {
            console.log(error)
            toast.error(error.message || "Failed to create account");
        }
    });
};

export const useAuth = () => {
    const { data: userProfile, isLoading: isProfileLoading } = useUserMe();
    const loginMutation = useLoginUser();
    const registerMutation = useRegisterUser();
    const logoutMutation = useLogoutUser();

    return {
        user: userProfile?.data,
        isAuthenticated: !!userProfile?.data,
        isLoading: isProfileLoading || loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
        login: loginMutation,
        register: registerMutation,
        logout: logoutMutation,
    };
};
