import { Request, Response } from 'express';
import Product from '../../models/product.model';
import { successResponse, errorResponse } from '../../utils/response';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, category, minPrice, maxPrice, name, sortBy, sortOrder } = req.query;

        const filter: any = {};
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (name) filter.name = { $regex: name, $options: 'i' };

        const skip = (Number(page) - 1) * Number(limit);

        // Build sort object
        let sort: Record<string, 1 | -1> = { createdAt: -1 }; // default: newest first
        if (sortBy) {
            const order = sortOrder === 'asc' ? 1 : -1;
            sort = { [sortBy as string]: order };
        }

        const total_data = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort(sort);

        const total_page = Math.ceil(total_data / Number(limit));

        return successResponse(res, 'Products retrieved successfully', {
            page: Number(page),
            total_page,
            total_data,
            products,
        });
    } catch (error: any) {
        return errorResponse(res, 'Failed to retrieve products', error.message, 500);
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Product.distinct('category');
        return successResponse(res, 'Categories retrieved successfully', categories);
    } catch (error: any) {
        return errorResponse(res, 'Failed to retrieve categories', error.message, 500);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return errorResponse(res, 'Product not found', null, 404);
        }
        return successResponse(res, 'Product retrieved successfully', product);
    } catch (error: any) {
        return errorResponse(res, 'Failed to retrieve product', error.message, 500);
    }
};

export const getProductBySlug = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            return errorResponse(res, 'Product not found', null, 404);
        }
        return successResponse(res, 'Product retrieved successfully', product);
    } catch (error: any) {
        return errorResponse(res, 'Failed to retrieve product', error.message, 500);
    }
};
