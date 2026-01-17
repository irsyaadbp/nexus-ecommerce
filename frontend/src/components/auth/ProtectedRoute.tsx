import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthAdmin } from "../../hooks/useAuthAdmin";
import { SESSION_TOKEN_KEY } from "@/lib/constants";

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading, admin } = useAuthAdmin();
    const location = useLocation();
    const token = localStorage.getItem(SESSION_TOKEN_KEY);

    if (!token) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (isLoading) {
        return (
            <div className="min-h-svh flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated || admin?.role !== 'ADMIN') {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};
