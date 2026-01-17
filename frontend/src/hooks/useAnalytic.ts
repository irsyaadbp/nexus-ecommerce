import LogRocket from "logrocket";
import { useAuth } from "./useAuth";
import { useVisitor } from "./useVisitor";
import { ANALYTIC_ENABLE } from "@/lib/constants";

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
    const { user } = useAuth();
    const { visitorId } = useVisitor();

    const identify = () => {
        const userId = user?._id || visitorId;
        const params = {
            name: user?.username || 'guest',
            email: user?.email || 'guest',
            role: user?.role || 'guest',
        }
        if (ANALYTIC_ENABLE) {
            LogRocket.identify(userId, params);
        }

        if (import.meta.env.DEV) {
            console.group("Analytics: Identify");
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
