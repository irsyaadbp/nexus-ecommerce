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
    slug: string;
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
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
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

productSchema.pre<IProduct>('save', async function () {
    if (!this.isModified('name') && this.slug) {
        return;
    }

    let baseSlug = this.name
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

    if (!this.slug || this.isModified('name')) {
        let slug = baseSlug;
        const ProductModel = mongoose.model<IProduct>('Product');
        let exists = await ProductModel.findOne({ slug, _id: { $ne: this._id } });

        if (exists) {
            slug = `${baseSlug}-${Date.now()}`;
        }
        this.slug = slug;
    }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
