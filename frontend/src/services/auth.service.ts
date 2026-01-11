import { fetcher } from "../lib/api";
import type { LoginInput, LoginResponse, UserResponse } from "@/types/auth.types";

export const authService = {
    adminLogin: async (data: LoginInput): Promise<LoginResponse> => {
        return fetcher<LoginResponse>('/admin/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    userLogin: async (data: LoginInput): Promise<LoginResponse> => {
        return fetcher<LoginResponse>('/user/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getAdminMe: async (): Promise<UserResponse> => {
        return fetcher<UserResponse>('/admin/me');
    },

    logoutAdmin: async (): Promise<void> => {
        return fetcher<void>('/admin/logout', {
            method: 'POST',
        });
    },

    logoutUser: async (): Promise<void> => {
        return fetcher<void>('/user/logout', {
            method: 'POST',
        });
    },

    getUserMe: async (): Promise<UserResponse> => {
        return fetcher<UserResponse>('/user/me');
    }
};
