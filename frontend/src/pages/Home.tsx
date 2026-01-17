import { motion } from "motion/react";
import { HeroBanner } from "../components/Homepage/HeroBanner";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useUserProducts } from "@/hooks/useProducts";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";

export default function Home() {
    // Fetch sale products (products with originalPrice)
    const { data: saleProductsData, isLoading: isSaleLoading } = useUserProducts({
        isSale: "true",
        limit: "4"
    });
    const saleProducts = saleProductsData?.data?.products || [];

    // Fetch all products
    const { data: allProductsData, isLoading: isAllProductsLoading } = useUserProducts({
        limit: "8"
    });
    const allProducts = allProductsData?.data?.products || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    return (
        <main>
            <HeroBanner />
            {saleProducts.length > 0 && (
                <section className="py-8 border-b border-border/50">
                    <div className="container-main">
                        <motion.div
                            className="flex items-center justify-between mb-6"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1 bg-primary rounded-full" />
                                <h2 className="text-xl font-bold text-foreground">🔥 Flash Sale</h2>
                            </div>

                        </motion.div>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {saleProducts.slice(0, 4).map((product, index) => (
                                <ProductCard key={product._id} product={product} index={index} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            <section className="py-8">
                <div className="container-main">
                    <motion.div
                        className="flex items-center justify-between mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 bg-primary rounded-full" />
                            <h2 className="text-xl font-bold text-foreground">Semua Produk</h2>
                            <span className="text-sm text-muted-foreground">
                                {isAllProductsLoading ? "..." : `(${allProducts.length})`}
                            </span>
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {isAllProductsLoading
                            ? [...Array(10)].map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
                            : allProducts.map((product, index) => (
                                <ProductCard key={product._id} product={product} index={index} />
                            ))
                        }
                    </motion.div>

                    {/* Load More */}
                    {!isAllProductsLoading && <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/products">
                            <Button variant="secondary">
                                Lihat Lebih Banyak
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>}
                </div>
            </section>
        </main>
    );
}
