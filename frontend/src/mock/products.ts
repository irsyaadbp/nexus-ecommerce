import type { Product } from "@/types";

export const products: Product[] = [
    {
        id: 1,
        name: "Kursi Kayu Minimalis",
        category: "Furniture",
        price: 1250000,
        originalPrice: 1500000,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80"
        ],
        rating: 4.8,
        reviews: 124,
        description: "Kursi kayu minimalis dengan desain elegan dan nyaman. Dibuat dari kayu jati berkualitas tinggi dengan finishing natural yang tahan lama. Cocok untuk ruang tamu atau ruang kerja.",
        isSale: true,
        slug: "kursi-kayu-minimalis"
    },
    {
        id: 2,
        name: "Lampu Meja Nordic",
        category: "Lighting",
        price: 450000,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80"
        ],
        rating: 4.6,
        reviews: 89,
        description: "Lampu meja dengan desain Nordic yang simpel dan modern. Memberikan pencahayaan hangat yang sempurna untuk menciptakan suasana cozy di ruangan Anda.",
        isNew: true,
        slug: "lampu-meja-nordic"
    },
    {
        id: 3,
        name: "Vas Keramik Artisan",
        category: "Dekorasi",
        price: 275000,
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
            "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&q=80"
        ],
        rating: 4.9,
        reviews: 56,
        description: "Vas keramik buatan tangan dengan tekstur unik dan warna earthy. Setiap vas memiliki karakteristik tersendiri karena dibuat secara handmade oleh pengrajin lokal.",
        slug: "vas-keramik-artisan"
    },
    {
        id: 4,
        name: "Sofa 3 Seater Premium",
        category: "Furniture",
        price: 8500000,
        originalPrice: 9500000,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80"
        ],
        rating: 4.7,
        reviews: 203,
        description: "Sofa premium dengan bahan fabric berkualitas tinggi dan busa dengan kepadatan optimal untuk kenyamanan maksimal. Desain modern yang cocok untuk berbagai gaya interior.",
        variants: ["2 Seater", "3 Seater", "L-Shape"],
        isSale: true,
        slug: "sofa-3-seater-premium"
    },
    {
        id: 5,
        name: "Meja Kopi Marmer",
        category: "Furniture",
        price: 2750000,
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&q=80"
        ],
        rating: 4.5,
        reviews: 67,
        description: "Meja kopi dengan top marmer asli dan kaki besi powder coated. Memberikan sentuhan mewah dan elegan pada ruang tamu Anda.",
        slug: "meja-kopi-marmer"
    },
    {
        id: 6,
        name: "Rak Buku Modular",
        category: "Storage",
        price: 1850000,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80"
        ],
        rating: 4.4,
        reviews: 45,
        description: "Rak buku modular yang dapat disesuaikan dengan kebutuhan ruangan Anda. Material kayu solid dengan finishing natural.",
        isNew: true,
        slug: "rak-buku-modular"
    },
    {
        id: 7,
        name: "Karpet Tenun Tradisional",
        category: "Dekorasi",
        price: 950000,
        image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80"
        ],
        rating: 4.8,
        reviews: 112,
        description: "Karpet tenun tangan dengan motif tradisional Indonesia. Dibuat oleh pengrajin lokal menggunakan teknik tenun warisan budaya.",
        variants: ["120x180", "160x230", "200x300"],
        slug: "karpet-tenun-tradisional"
    },
    {
        id: 8,
        name: "Cermin Dinding Rotan",
        category: "Dekorasi",
        price: 525000,
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80"
        ],
        rating: 4.6,
        reviews: 78,
        description: "Cermin dinding dengan bingkai rotan natural. Menambah nuansa bohemian dan hangat pada ruangan Anda.",
        slug: "cermin-dinding-rotan"
    }
];

export const categories = [
    { name: "Semua", slug: "all" },
    { name: "Furniture", slug: "furniture" },
    { name: "Lighting", slug: "lighting" },
    { name: "Dekorasi", slug: "dekorasi" },
    { name: "Storage", slug: "storage" }
];
