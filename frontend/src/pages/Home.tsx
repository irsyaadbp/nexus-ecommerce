import { motion } from "motion/react";
import { HeroBanner } from "../components/Homepage/HeroBanner";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/mock/products";

export default function Home() {
    const saleProducts = products
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
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}
        </main>
    );
}
