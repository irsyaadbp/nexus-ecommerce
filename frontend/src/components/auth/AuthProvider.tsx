import type { ReactNode } from "react";
import { useUserMe } from "@/hooks/useAuth";
import { SESSION_TOKEN_KEY } from "@/lib/constants";
import { Logo } from "../Logo";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    const { isLoading } = useUserMe();

    // If there is a token and we are still loading the user profile, show a full screen loader
    if (token && isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Logo className="animate-pulse text-5xl!" />
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
