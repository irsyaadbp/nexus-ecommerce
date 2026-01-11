import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User, { UserRole } from '../models/user.model';
import Product from '../models/product.model';
import { connectDB } from './db';

dotenv.config();

const productData = [
    {
        name: "Kursi Kayu Minimalis",
        slug: "kursi-kayu-minimalis",
        category: "Furniture",
        price: 1250000,
        originalPrice: 1500000,
        images: [
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80"
        ],
        rating: 4.8,
        reviews: 124,
        description: "Kursi kayu minimalis dengan desain elegan dan nyaman."
    },
    {
        name: "Lampu Meja Nordic",
        slug: "lampu-meja-nordic",
        category: "Lighting",
        price: 450000,
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80"
        ],
        rating: 4.6,
        reviews: 89,
        description: "Lampu meja bergaya Nordic dengan cahaya hangat."
    },
    {
        name: "Vas Keramik Artisan",
        slug: "vas-keramik-artisan",
        category: "Dekorasi",
        price: 275000,
        images: [
            "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80"
        ],
        rating: 4.9,
        reviews: 56,
        description: "Vas keramik handmade dengan desain unik."
    },
    {
        name: "Sofa 3 Seater Premium",
        slug: "sofa-3-seater-premium",
        category: "Furniture",
        price: 8500000,
        originalPrice: 9500000,
        images: [
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80"
        ],
        rating: 4.7,
        reviews: 203,
        description: "Sofa premium dengan kenyamanan maksimal.",
        variants: [{ name: "2 Seater" }, { name: "3 Seater" }, { name: "L-Shape" }]
    },
    {
        name: "Meja Kopi Marmer",
        slug: "meja-kopi-marmer",
        category: "Furniture",
        price: 2750000,
        images: [
            "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&q=80"
        ],
        rating: 4.5,
        reviews: 67,
        description: "Meja kopi dengan top marmer asli."
    },

    {
        name: "Meja Makan Kayu Solid",
        slug: "meja-makan-kayu-solid",
        category: "Furniture",
        price: 7200000,
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"],
        rating: 4.8,
        reviews: 142,
        description: "Meja makan dari kayu solid dengan finishing natural."
    },
    {
        name: "Kursi Bar Industrial",
        slug: "kursi-bar-industrial",
        category: "Furniture",
        price: 950000,
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"],
        rating: 4.5,
        reviews: 63,
        description: "Kursi bar dengan rangka besi dan dudukan kayu."
    },
    {
        name: "Meja Kerja Scandinavian",
        slug: "meja-kerja-scandinavian",
        category: "Furniture",
        price: 3250000,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"],
        rating: 4.6,
        reviews: 88,
        description: "Meja kerja kayu dengan gaya Scandinavian."
    },
    {
        name: "Bangku Kayu Rustic",
        slug: "bangku-kayu-rustic",
        category: "Furniture",
        price: 1350000,
        images: ["https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80"],
        rating: 4.4,
        reviews: 54,
        description: "Bangku kayu rustic untuk ruang tamu atau taman."
    },

    {
        name: "Lampu Gantung Industrial",
        slug: "lampu-gantung-industrial",
        category: "Lighting",
        price: 1250000,
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80"],
        rating: 4.7,
        reviews: 110,
        description: "Lampu gantung bergaya industrial modern."
    },
    {
        name: "Lampu Lantai Modern",
        slug: "lampu-lantai-modern",
        category: "Lighting",
        price: 1850000,
        images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80"],
        rating: 4.6,
        reviews: 95,
        description: "Lampu lantai dengan desain ramping dan modern."
    },
    {
        name: "Lampu Tidur Minimalis",
        slug: "lampu-tidur-minimalis",
        category: "Lighting",
        price: 350000,
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80"],
        rating: 4.4,
        reviews: 77,
        description: "Lampu tidur dengan cahaya lembut."
    },
    {
        name: "Lampu LED Smart",
        slug: "lampu-led-smart",
        category: "Lighting",
        price: 425000,
        images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80"],
        rating: 4.6,
        reviews: 120,
        description: "Lampu LED pintar dengan kontrol aplikasi."
    },
    {
        name: "Jam Dinding Kayu",
        slug: "jam-dinding-kayu",
        category: "Dekorasi",
        price: 375000,
        images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80"],
        rating: 4.5,
        reviews: 73,
        description: "Jam dinding dari kayu natural."
    },
    {
        name: "Tanaman Hias Monstera",
        slug: "tanaman-hias-monstera",
        category: "Dekorasi",
        price: 225000,
        images: ["https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80"],
        rating: 4.8,
        reviews: 134,
        description: "Tanaman hias monstera untuk nuansa segar."
    },
    {
        name: "Patung Kayu Etnik",
        slug: "patung-kayu-etnik",
        category: "Dekorasi",
        price: 650000,
        images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80"],
        rating: 4.6,
        reviews: 41,
        description: "Patung kayu dengan motif etnik tradisional."
    },
    {
        name: "Bantal Sofa Bohemian",
        slug: "bantal-sofa-bohemian",
        category: "Dekorasi",
        price: 185000,
        images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80"],
        rating: 4.5,
        reviews: 88,
        description: "Bantal sofa dengan motif bohemian."
    },

    {
        name: "Rak Sepatu Kayu",
        slug: "rak-sepatu-kayu",
        category: "Storage",
        price: 850000,
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80"],
        rating: 4.4,
        reviews: 66,
        description: "Rak sepatu dari kayu solid."
    },
    {
        name: "Rak Dinding Minimalis",
        slug: "rak-dinding-minimalis",
        category: "Storage",
        price: 450000,
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80"],
        rating: 4.6,
        reviews: 92,
        description: "Rak dinding hemat ruang."
    },
    {
        name: "Laci Penyimpanan Modern",
        slug: "laci-penyimpanan-modern",
        category: "Storage",
        price: 1750000,
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80"],
        rating: 4.5,
        reviews: 74,
        description: "Laci penyimpanan dengan desain modern."
    },
    {
        name: "Kotak Penyimpanan Rotan",
        slug: "kotak-penyimpanan-rotan",
        category: "Storage",
        price: 325000,
        images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80"],
        rating: 4.6,
        reviews: 58,
        description: "Kotak penyimpanan berbahan rotan."
    },
    {
        name: "Rak Serbaguna Besi",
        slug: "rak-serbaguna-besi",
        category: "Storage",
        price: 950000,
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80"],
        rating: 4.5,
        reviews: 83,
        description: "Rak besi kuat dan multifungsi."
    },
];

const seedData = async () => {
    try {
        await connectDB();

        // Seed Users
        await User.deleteMany({});
        console.log('Cleared existing users');

        await User.create([
            {
                email: 'admin@nexus.com',
                username: 'admin',
                password: 'Password123',
                role: UserRole.ADMIN,
            },
            {
                email: 'user@nexus.com',
                username: 'customer',
                password: 'Password123',
                role: UserRole.CUSTOMER,
            }
        ]);
        console.log('Users seeded');

        // Seed Products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.create(productData);
        console.log('Products seeded');

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error: any) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
};

seedData();
