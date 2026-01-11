export interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    images?: string[];
    rating: number;
    reviews: number;
    description: string;
    variants?: { name: string }[];
    isNew?: boolean;
    isSale?: boolean;
    slug: string;
}
export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "rating-desc" | "newest";
