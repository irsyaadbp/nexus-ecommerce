import LogRocket from "logrocket";
import { useUserMe } from "./useAuth";
import { useVisitor } from "./useVisitor";
import { ANALYTIC_ENABLE } from "@/lib/constants";
import type { User } from "@/types/auth.types";

interface AddToCartParams {
    price: number;
    date: string;
    productName: string;
    category: string;
    variant?: string;
    originalPrice?: number;
    quantity: number;
}

export function useAnalytic() {
    const { data: userProfile } = useUserMe();
    const user = userProfile?.data;
    const { visitorId } = useVisitor();

    const identify = (userOverride?: User, source?: string) => {
        console.log(userOverride)
        const userId = userOverride?._id || user?._id || visitorId;
        const params = {
            name: userOverride?.username || user?.username || visitorId,
            email: userOverride?.email || user?.email || 'guest',
            role: userOverride?.role || user?.role || 'guest',
        }
        if (ANALYTIC_ENABLE) {
            LogRocket.identify(userId, params);
        }

        if (import.meta.env.DEV) {
            console.group("Analytics: Identify", { source });
            console.log(JSON.stringify({ userId, ...params }, null, 2));
            console.groupEnd();
        }
    }

    const addToCart = (params: AddToCartParams) => {
        if (ANALYTIC_ENABLE) {
            LogRocket.track("AddToCart", {
                ...params,
                // Ensure date is serializable or specifically formatted if needed
                date: params.date,
            });
        }

        // We can also console log for dev visibility
        if (import.meta.env.DEV) {
            console.group("Analytics: Add to Cart");
            console.log(JSON.stringify(params, null, 2));
            console.groupEnd();
        }
    };

    return {
        identify,
        addToCart
    };
}
