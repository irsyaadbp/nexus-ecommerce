import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useUserProducts, useUserCategories } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";

const PRODUCTS_PER_PAGE = 12;

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    // Debounce search query
    const debouncedSearch = useDebounce(searchQuery, 400);

    // Build query params for API
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {
            page: currentPage.toString(),
            limit: PRODUCTS_PER_PAGE.toString(),
        };

        if (selectedCategory !== "all") {
            params.category = selectedCategory;
        }

        if (debouncedSearch) {
            params.name = debouncedSearch;
        }

        // Map sort options to API params (same as AdminProducts)
        switch (sortBy) {
            case "name-asc":
                params.sortBy = "name";
                params.sortOrder = "asc";
                break;
            case "name-desc":
                params.sortBy = "name";
                params.sortOrder = "desc";
                break;
            case "price-asc":
                params.sortBy = "price";
                params.sortOrder = "asc";
                break;
            case "price-desc":
                params.sortBy = "price";
                params.sortOrder = "desc";
                break;
            case "rating-desc":
                params.sortBy = "rating";
                params.sortOrder = "desc";
                break;
            case "newest":
            default:
                params.sortBy = "createdAt";
                params.sortOrder = "desc";
                break;
        }

        return params;
    }, [currentPage, selectedCategory, debouncedSearch, sortBy]);

    // Fetch products from API
    const { data: productsData, isLoading } = useUserProducts(queryParams);
    const products = productsData?.data?.products || [];
    const totalPages = productsData?.data?.total_page || 1;
    const totalData = productsData?.data?.total_data || 0;

    // Fetch categories from API
    const { data: categoriesData } = useUserCategories();
    const apiCategories = categoriesData?.data || [];
    const categories = [
        { slug: "all", name: "Semua Kategori" },
        ...apiCategories.map(cat => ({ slug: cat, name: cat }))
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Reset page when filters change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        setCurrentPage(1);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * PRODUCTS_PER_PAGE, totalData);

    return (
        <section>
            <section className="section-padding pb-8">
                <div className="container-main">
                    <motion.div
                        className="text-center max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Semua Produk
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Temukan koleksi furniture dan dekorasi terbaik untuk rumah Anda
                        </p>
                    </motion.div>
                </div>
            </section>
            <section className="pb-20">
                <div className="container-main">
                    <motion.div
                        className="glass-card p-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="filter-bar">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="filter-search">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari produk..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="pl-12 h-12"
                                    />
                                </div>

                                <div className="filter-sort shrink-0">
                                    <SlidersHorizontal className="h-5 w-5 text-muted-foreground hidden sm:block" />
                                    <Select value={sortBy} onValueChange={handleSortChange}>
                                        <SelectTrigger className="form-select-trigger w-full sm:w-[180px] !h-12">
                                            <SelectValue placeholder="Urutkan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newest">Terbaru</SelectItem>
                                            <SelectItem value="name-asc">Nama A-Z</SelectItem>
                                            <SelectItem value="name-desc">Nama Z-A</SelectItem>
                                            <SelectItem value="price-asc">Harga Terendah</SelectItem>
                                            <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
                                            <SelectItem value="rating-desc">Rating Tertinggi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="filter-categories-scroll">
                                {categories.map((category, index) => (
                                    <motion.button
                                        key={category.slug}
                                        onClick={() => handleCategoryChange(category.slug)}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`filter-category-btn ${selectedCategory === category.slug
                                            ? "filter-category-btn-active"
                                            : "filter-category-btn-inactive"
                                            }`}
                                    >
                                        {category.name}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        className="mb-6 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Menampilkan <span className="text-primary font-semibold">{totalData > 0 ? startIndex : 0}{totalData > 1 ? `-${endIndex}` : ""}</span> dari <span className="text-primary font-semibold">{totalData}</span> produk
                    </motion.p>

                    {isLoading ? (
                        <div className="py-20 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="h-6 w-6 animate-spin" />
                                <span>Memuat produk...</span>
                            </div>
                        </div>
                    ) : products.length === 0 ? (
                        <motion.div
                            className="glass-card py-20 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-lg text-muted-foreground">
                                Tidak ada produk ditemukan.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key={`${currentPage}-${selectedCategory}-${sortBy}`}
                        >
                            {products.map((product, index) => (
                                <ProductCard key={product._id} product={product} index={index} />
                            ))}
                        </motion.div>
                    )}

                    {/* {totalPages > 1 && ( */}
                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {getPageNumbers().map((page, index) => (
                                    <PaginationItem key={index}>
                                        {page === "..." ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                onClick={() => handlePageChange(page as number)}
                                                isActive={currentPage === page}
                                                className="cursor-pointer"
                                            >
                                                {page}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </motion.div>
                    {/* )} */}
                </div>
            </section>
        </section>
    );
}
