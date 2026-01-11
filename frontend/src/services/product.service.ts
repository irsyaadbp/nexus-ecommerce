import { fetcher } from "@/lib/api";
import type { Product } from "@/types";
import type { ProductFormData } from "@/schemas/product.schema";

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

export const productService = {
    getAdminProducts: async (params: Record<string, any>) => {
        return fetcher<ProductsResponse>("/admin/products", { params });
    },

    getProductCategories: async () => {
        return fetcher<CategoriesResponse>("/admin/products/categories");
    },

    createProduct: async (data: ProductFormData) => {
        return fetcher<ProductResponse>("/admin/products", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    updateProduct: async (id: string | number, data: Partial<ProductFormData>) => {
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
