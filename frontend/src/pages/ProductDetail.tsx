import { products } from "@/mock/products";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Truck, Shield, RefreshCw, ShoppingBag, Heart, Star, ChevronRight, Minus, Plus } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";

const MotionButton = motion.create(Button);
const MotionBadge = motion.create(Badge);

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();


    const product = products.find((p) => p.slug === slug);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);

    if (!product) {
        return (
            <div className="container-main py-20 text-center">
                <motion.div
                    className="glass-card p-12 max-w-md mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 className="text-2xl font-bold text-foreground mb-4">Produk tidak ditemukan</h1>
                    <Link to="/products">
                        <Button>
                            Kembali ke Produk
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p._id !== product._id)
        .slice(0, 4);

    const features = [
        { icon: Truck, text: "Gratis ongkir untuk pembelian di atas Rp 500.000" },
        { icon: Shield, text: "Garansi 1 tahun untuk semua produk" },
        { icon: RefreshCw, text: "30 hari pengembalian tanpa syarat" }
    ];

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <section>
            <section className="product-detail-section">
                <div className="product-detail-grid">
                    <motion.div
                        className="product-detail-gallery"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="product-detail-main-image"
                            layoutId={`product-image-${product._id}`}
                        >
                            <motion.img
                                key={selectedImage}
                                src={product.images?.[selectedImage] || product.image}
                                alt={product.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                        {product.images && product.images.length > 1 && (
                            <div className="product-detail-thumbnails">
                                {product.images.map((image, index) => (
                                    <MotionButton
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`product-detail-thumbnail ${selectedImage === index ? "product-detail-thumbnail-active" : ""
                                            } !p-0`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <img src={image} alt={`${product.name} ${index + 1}`} />
                                    </MotionButton>
                                ))}
                            </div>
                        )}
                    </motion.div>
                    <motion.div
                        className="product-detail-info"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Breadcrumb */}
                        <nav className="product-detail-breadcrumb">
                            <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link to="/products" className="hover:text-primary transition-colors">Produk</Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-foreground">{product.category}</span>
                        </nav>

                        <h1 className="product-detail-title">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating)
                                            ? "fill-primary text-primary"
                                            : "text-muted"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground">
                                {product.rating} ({product.reviews} ulasan)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="product-detail-price">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-xl text-muted-foreground line-through">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                    <MotionBadge
                                        variant="destructive"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500 }}
                                    >
                                        -{discount}% OFF
                                    </MotionBadge>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="product-detail-description">{product.description}</p>

                        {/* Size Options */}
                        {product.variants && (
                            <div className="product-detail-options">
                                <span className="product-detail-option-label">
                                    Variant: <strong className="text-primary">{product.variants[selectedSize]}</strong>
                                </span>
                                <div className="product-detail-sizes">
                                    {product.variants.map((variant, index) => (
                                        <MotionButton
                                            key={variant}
                                            onClick={() => setSelectedSize(index)}
                                            size={'sm'}
                                            variant={selectedSize === index ? 'default' : 'outline'}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {variant}
                                        </MotionButton>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="product-detail-options">
                            <span className="product-detail-option-label">Jumlah</span>
                            <div className="product-detail-quantity">
                                <MotionButton
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    variant={'secondary'}
                                    size={'icon-lg'}
                                    className="rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Minus className="h-4 w-4" />
                                </MotionButton>
                                <motion.span
                                    key={quantity}
                                    className="product-detail-quantity-value"
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                >
                                    {quantity}
                                </motion.span>
                                <MotionButton
                                    onClick={() => setQuantity(quantity + 1)}
                                    variant={'secondary'}
                                    size={'icon-lg'}
                                    className="rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Plus className="h-4 w-4" />
                                </MotionButton>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="product-detail-actions">
                            <MotionButton
                                className="flex-1"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Tambah ke Keranjang
                            </MotionButton>
                            <MotionButton
                                variant={'secondary'}
                                size={'icon-lg'}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Heart className="h-5 w-5" />
                            </MotionButton>
                        </div>

                        {/* Features */}
                        <motion.div
                            className="glass-card p-4 mt-6 space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-3 text-sm text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>{feature.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="products-section border-t border-border/50">
                    <div className="container-main">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-title">Produk Terkait</h2>
                            <p className="section-subtitle">
                                Anda mungkin juga menyukai produk ini
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {relatedProducts.map((product, index) => (
                                <ProductCard key={product._id} product={product} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
}
