export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    rating: number;
    reviews: number;
    description: string;
    sizes?: string[];
    isNew?: boolean;
    isSale?: boolean;
    slug: string;
}
