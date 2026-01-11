import { fetcher } from "@/lib/api";
import type { Product } from "@/types";

export interface ProductsResponse {
    success: boolean;
    message: string;
    data: {
        page: number;
        total_page: number;
        total_data: number;
        products: Product[];
    };
}

export interface CategoriesResponse {
    success: boolean;
    message: string;
    data: string[];
}

export interface ProductResponse {
    success: boolean;
    message: string;
    data: Product;
}

// API Payload types matching backend schema
export interface CreateProductPayload {
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
    originalPrice?: number;
    variants?: { name: string }[];
    slug?: string;
}

export interface UpdateProductPayload {
    name?: string;
    category?: string;
    price?: number;
    description?: string;
    images?: string[];
    originalPrice?: number;
    variants?: { name: string }[];
    slug?: string;
}

export const productService = {
    // User (public) API
    getUserProducts: async (params: Record<string, string>) => {
        return fetcher<ProductsResponse>("/user/products", { params });
    },

    getUserProductBySlug: async (slug: string) => {
        return fetcher<ProductResponse>(`/user/products/${slug}`);
    },

    getUserCategories: async () => {
        return fetcher<CategoriesResponse>("/user/products/categories");
    },

    // Admin API
    getAdminProducts: async (params: Record<string, string>) => {
        return fetcher<ProductsResponse>("/admin/products", { params });
    },

    getProductCategories: async () => {
        return fetcher<CategoriesResponse>("/admin/products/categories");
    },

    createProduct: async (data: CreateProductPayload) => {
        return fetcher<ProductResponse>("/admin/products", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    updateProduct: async (id: string | number, data: UpdateProductPayload) => {
        return fetcher<ProductResponse>(`/admin/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    deleteProduct: async (id: string | number) => {
        return fetcher<{ success: boolean; message: string }>(`/admin/products/${id}`, {
            method: "DELETE",
        });
    },

    getProductBySlug: async (slug: string) => {
        return fetcher<ProductResponse>(`/admin/products/${slug}`);
    }
};
