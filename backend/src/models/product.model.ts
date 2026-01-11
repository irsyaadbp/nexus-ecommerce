import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    reviews: number;
    description: string;
    variants?: { name: string }[];
}

const productSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        originalPrice: {
            type: Number,
        },
        images: {
            type: [String],
            required: true,
            default: [],
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        variants: {
            type: [
                {
                    name: { type: String, required: true },
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
