import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    originalPrice: z.coerce.number().min(0, "Original price must be a positive number").optional().or(z.literal("")),
    description: z.string().min(1, "Description is required"),
    image: z.string().url("Invalid image URL").or(z.literal("")),
    variants: z.array(z.string()).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
