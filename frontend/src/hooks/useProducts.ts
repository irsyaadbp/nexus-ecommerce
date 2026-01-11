import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, type CreateProductPayload, type UpdateProductPayload } from "@/services/product.service";
import { toast } from "sonner";

// User (public) hooks
export const useUserProducts = (params: Record<string, string>) => {
    return useQuery({
        queryKey: ["user-products", params],
        queryFn: () => productService.getUserProducts(params),
    });
};

export const useUserProductBySlug = (slug: string | undefined) => {
    return useQuery({
        queryKey: ["user-product", slug],
        queryFn: () => productService.getUserProductBySlug(slug!),
        enabled: !!slug,
    });
};

export const useUserCategories = () => {
    return useQuery({
        queryKey: ["user-categories"],
        queryFn: productService.getUserCategories,
    });
};

// Admin hooks
export const useAdminProducts = (params: Record<string, string>) => {
    return useQuery({
        queryKey: ["admin-products", params],
        queryFn: () => productService.getAdminProducts(params),
    });
};

export const useProductCategories = () => {
    return useQuery({
        queryKey: ["product-categories"],
        queryFn: productService.getProductCategories,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateProductPayload) => productService.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            toast.success("Product created successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create product");
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: UpdateProductPayload }) =>
            productService.updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            toast.success("Product updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update product");
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            toast.success("Product deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete product");
        },
    });
};
