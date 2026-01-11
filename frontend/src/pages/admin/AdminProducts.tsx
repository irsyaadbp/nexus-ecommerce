import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useMemo, useState } from "react";
import { categories, products } from "@/mock/products";
import { AlertTriangle, ArrowUpDown, Edit, Filter, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SortOption } from "@/types";
import { formatPrice } from "@/lib/formatPrice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { DialogProductMutation } from "@/components/admin/DialogProductMutation";
import type { ProductFormData } from "@/schemas/product.schema";

export default function AdminProducts() {
    const [productList, setProductList] = useState(products);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [deletePopoverOpen, setDeletePopoverOpen] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = productList.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Apply category filter
        if (categoryFilter !== "all") {
            result = result.filter(product => product.category === categoryFilter);
        }

        // Apply sorting
        switch (sortBy) {
            case "name-asc":
                result = [...result].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result = [...result].sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "price-asc":
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case "rating-desc":
                result = [...result].sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
            default:
                result = [...result].sort((a, b) => b.id - a.id);
                break;
        }

        return result;
    }, [productList, searchQuery, categoryFilter, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const columns: DataTableColumn<Product>[] = [
        {
            title: "Produk",
            key: "name",
            render: (value, product) => (
                <div className="flex items-center gap-3">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                        <p className="font-medium text-foreground">{value}</p>
                        <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                    </div>
                </div>
            )
        },
        {
            title: "Kategori",
            key: "category",
            render: (category) => <Badge variant="secondary">{category}</Badge>
        },
        {
            title: "Harga",
            key: "price",
            render: (value, product) => (
                <div>
                    <p className="font-medium text-primary">{formatPrice(value)}</p>
                    {product.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                        </p>
                    )}
                </div>
            )
        },
        {
            title: "Rating",
            key: "rating",
            render: (value, product) => (
                <div>
                    <span className="text-foreground">{value}</span>
                    <span className="text-muted-foreground text-xs ml-1">({product.reviews})</span>
                </div>
            )
        },
        {
            title: "Aksi",
            key: "actions",
            render: (_, product) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openEditModal(product)}
                        className="h-8 w-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <Popover open={deletePopoverOpen === product.id} onOpenChange={(open) => setDeletePopoverOpen(open ? product.id : null)}>
                        <PopoverTrigger asChild>
                            <button
                                className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 text-destructive transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72" align="end">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="h-5 w-5 text-destructive" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Hapus Produk?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {product.name} akan dihapus permanen.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => setDeletePopoverOpen(null)}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            )
        }
    ];

    const openAddModal = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleMutationSubmit = (data: ProductFormData) => {
        if (editingProduct) {
            setProductList(prev => prev.map(p =>
                p.id === editingProduct.id
                    ? {
                        ...p,
                        name: data.name,
                        category: data.category,
                        price: data.price,
                        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
                        description: data.description,
                        image: data.image,
                        variants: data.variants
                    }
                    : p
            ));
        } else {
            const newProduct: Product = {
                id: Date.now(),
                name: data.name,
                category: data.category,
                price: data.price,
                originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
                description: data.description,
                image: data.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
                rating: 5.0,
                reviews: 0,
                isNew: true,
                variants: data.variants,
                slug: data.name.toLowerCase().replace(/ /g, "-")
            };
            setProductList(prev => [newProduct, ...prev]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: number) => {
        setProductList(prev => prev.filter(p => p.id !== id));
        setDeletePopoverOpen(null);
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Produk</h1>
                    <p className="text-muted-foreground">Kelola semua produk toko Anda</p>
                </div>
                <Button onClick={openAddModal}>
                    <Plus className="h-4 w-4" />
                    Tambah Produk
                </Button>
            </div>

            <div className="glass-card p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Cari produk..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-12"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={categoryFilter} onValueChange={(val) => {
                            setCategoryFilter(val);
                            setCurrentPage(1);
                        }}>
                            <SelectTrigger className="w-[160px] !h-12">
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Kategori</SelectLabel>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                        <Select value={sortBy} onValueChange={(value: SortOption) => {
                            setSortBy(value);
                            setCurrentPage(1);
                        }}>
                            <SelectTrigger className="w-[180px] !h-12">
                                <SelectValue placeholder="Urutkan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Urutkan</SelectLabel>
                                    <SelectItem value="newest">Terbaru</SelectItem>
                                    <SelectItem value="name-asc">Nama A-Z</SelectItem>
                                    <SelectItem value="name-desc">Nama Z-A</SelectItem>
                                    <SelectItem value="price-asc">Harga Terendah</SelectItem>
                                    <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
                                    <SelectItem value="rating-desc">Rating Tertinggi</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Active Filters Info */}
                {(categoryFilter !== "all" || searchQuery) && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">
                            Menampilkan {filteredProducts.length} produk
                        </span>
                        {(categoryFilter !== "all" || searchQuery) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setCategoryFilter("all");
                                    setSearchQuery("");
                                }}
                                className="text-xs h-7"
                            >
                                Reset Filter
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <DataTable
                columns={columns}
                data={paginatedProducts}
                page={currentPage}
                totalPage={totalPages}
                onChangePage={setCurrentPage}
            />

            <DialogProductMutation
                open={showModal}
                onOpenChange={setShowModal}
                editingProduct={editingProduct}
                onSubmit={handleMutationSubmit}
            />
        </section>
    );
}
