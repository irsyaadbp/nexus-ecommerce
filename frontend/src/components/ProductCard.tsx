import React from "react";
import { Link } from "react-router";
import { Star, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
    product: Product;
    index?: number;
}


const MotionButton = motion.create(Button);
const MotionBadge = motion.create(Badge);

export function ProductCard({ product, index = 0 }: ProductCardProps) {
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group"
        >
            <Link to={`/products/${product.slug}`} className="block">
                <div className="glass-card overflow-hidden">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-secondary/30">
                        <motion.img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                                <MotionBadge
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                >
                                    NEW
                                </MotionBadge>
                            )}
                            {discount > 0 && (
                                <MotionBadge
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    variant={"destructive"}
                                >
                                    -{discount}%
                                </MotionBadge>
                            )}
                        </div>


                        {/* Add to Cart Button */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                        >
                            <MotionButton
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                                onClick={(e: React.MouseEvent) => {
                                    e.preventDefault();
                                }}
                            >
                                <ShoppingBag className="h-4 w-4" />
                                Tambah ke Keranjang
                            </MotionButton>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {product.category}
                        </span>

                        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-3.5 w-3.5 ${i < Math.floor(product.rating)
                                            ? "fill-primary text-primary"
                                            : "text-muted"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                                ({product.reviews})
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-2 pt-1">
                            <span className="text-lg font-bold text-primary">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}   