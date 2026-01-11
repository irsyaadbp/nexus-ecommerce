import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Product name is required'),
        category: z.string().min(1, 'Category is required'),
        price: z.number().min(0, 'Price must be a positive number'),
        originalPrice: z.number().min(0, 'Original price must be a positive number').optional(),
        images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
        rating: z.number().min(0).max(5).default(0),
        reviews: z.number().min(0).default(0),
        description: z.string().min(1, 'Description is required'),
        slug: z.string().optional(),
        variants: z.array(z.object({ name: z.string().min(1) })).optional(),
    }),
});

export const updateProductSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
    }),
    body: z.object({
        name: z.string().optional(),
        category: z.string().optional(),
        price: z.number().min(0).optional(),
        originalPrice: z.number().min(0).optional(),
        images: z.array(z.string().url()).optional(),
        rating: z.number().min(0).max(5).optional(),
        reviews: z.number().min(0).optional(),
        description: z.string().optional(),
        slug: z.string().optional(),
        variants: z.array(z.object({ name: z.string().min(1) })).optional(),
    }),
});

export const getProductsQuerySchema = z.object({
    query: z.object({
        page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
        limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
        category: z.string().optional(),
        minPrice: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
        maxPrice: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
        name: z.string().optional(),
    }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
