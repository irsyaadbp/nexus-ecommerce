import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router";

const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
        title: "Living Room Collection",
        subtitle: "Diskon hingga 30%",
        cta: "Belanja Sekarang"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
        title: "New Arrivals",
        subtitle: "Koleksi Terbaru 2024",
        cta: "Lihat Koleksi"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80",
        title: "Home Decor",
        subtitle: "Percantik Ruanganmu",
        cta: "Explore"
    }
];

export function HeroBanner() {
    const [currentBanner, setCurrentBanner] = useState(0);

    const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
    const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

    useEffect(() => {
        const interval = setInterval(nextBanner, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden">
            <div className="relative h-[500px]">
                <AnimatePresence mode="wait">
                    {banners.map((banner, index) => (
                        index === currentBanner && (
                            <motion.div
                                key={banner.id}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.7 }}
                                className="absolute inset-0"
                            >
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
                                <div className="absolute inset-0 flex items-center mt-20">
                                    <div className="container-main">
                                        <motion.div
                                            className="max-w-lg space-y-4"
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        >
                                            <Badge>{banner.subtitle}</Badge>
                                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                                                {banner.title}
                                            </h1>
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                            >
                                                <Link to="/products" className="inline-flex md:mt-6">
                                                    <Button>
                                                        {banner.cta}
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                {/* Banner Navigation */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevBanner}
                        className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <div className="flex gap-2">
                        {banners.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentBanner(index)}
                                className={`h-2 rounded-full transition-all ${index === currentBanner ? "w-8 bg-primary" : "w-2 bg-foreground/30"
                                    }`}
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextBanner}
                        className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors cursor-pointer"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </motion.button>
                </div>
            </div>
        </section>
    )
}