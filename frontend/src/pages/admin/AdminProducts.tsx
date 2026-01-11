import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useMemo, useState } from "react";
import { categories, products } from "@/mock/products";
import { AlertTriangle, ArrowUpDown, Check, Edit, Filter, Plus, Search, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SortOption } from "@/types";
import { formatPrice } from "@/lib/formatPrice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";

export default function AdminProducts() {
    const [productList, setProductList] = useState(products);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [deletePopoverOpen, setDeletePopoverOpen] = useState<number | null>(null);
    const [savePopoverOpen, setSavePopoverOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        originalPrice: "",
        description: "",
        image: ""
    });

    const [sizes, setSizes] = useState<string[]>([]);
    const [newSize, setNewSize] = useState("");


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
        setFormData({
            name: "",
            category: "",
            price: "",
            originalPrice: "",
            description: "",
            image: ""
        });
        setSizes([]);
        setNewSize("");
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            originalPrice: product.originalPrice?.toString() || "",
            description: product.description,
            image: product.image
        });
        setSizes(product.variants || []);
        setNewSize("");
        setShowModal(true);
    };

    const addSize = () => {
        if (newSize.trim() && !sizes.includes(newSize.trim())) {
            setSizes([...sizes, newSize.trim()]);
            setNewSize("");
        }
    };

    const removeSize = (index: number) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    const handleSizeKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSize();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSavePopoverOpen(true);
    };

    const confirmSave = () => {
        const productSizes = sizes.length > 0 ? sizes : undefined;

        if (editingProduct) {
            setProductList(prev => prev.map(p =>
                p.id === editingProduct.id
                    ? {
                        ...p,
                        name: formData.name,
                        category: formData.category,
                        price: Number(formData.price),
                        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
                        description: formData.description,
                        image: formData.image,
                        variants: productSizes
                    }
                    : p
            ));
        } else {
            const newProduct: Product = {
                id: Date.now(),
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
                description: formData.description,
                image: formData.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
                rating: 5.0,
                reviews: 0,
                isNew: true,
                variants: productSizes
            };
            setProductList(prev => [newProduct, ...prev]);
        }

        setSavePopoverOpen(false);
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

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label className="form-label">Nama Produk</label>
                            <Input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Masukkan nama produk"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Kategori</label>
                            <Select>
                                <SelectTrigger className="!h-12 w-full">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pilih kategori</SelectLabel>
                                        <SelectItem value="Furniture">Furniture</SelectItem>
                                        <SelectItem value="Lighting">Lighting</SelectItem>
                                        <SelectItem value="Dekorasi">Dekorasi</SelectItem>
                                        <SelectItem value="Storage">Storage</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="form-label">Harga</label>
                                <Input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Harga Asli (Opsional)</label>
                                <Input
                                    type="number"
                                    value={formData.originalPrice}
                                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">URL Gambar</label>
                            <Input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Ukuran / Variant</label>
                            <div className="flex gap-2 mb-2">
                                <Input
                                    type="text"
                                    value={newSize}
                                    onChange={(e) => setNewSize(e.target.value)}
                                    onKeyDown={handleSizeKeyDown}
                                    className="flex-1"
                                    placeholder="Ketik ukuran lalu tekan Enter atau +"
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon-lg"
                                    onClick={addSize}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {sizes.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                                        >
                                            {size}
                                            <button
                                                type="button"
                                                onClick={() => removeSize(index)}
                                                className="hover:text-destructive transition-colors"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Deskripsi</label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Masukkan deskripsi produk"
                                required
                                rows={10}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                                Batal
                            </Button>
                            <Popover open={savePopoverOpen} onOpenChange={setSavePopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button type="submit" className="flex-1">
                                        {editingProduct ? "Simpan Perubahan" : "Tambah Produk"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-72" align="end">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Check className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">
                                                    {editingProduct ? "Simpan Perubahan?" : "Tambah Produk?"}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {editingProduct
                                                        ? "Perubahan akan disimpan ke produk ini."
                                                        : "Produk baru akan ditambahkan ke daftar."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => setSavePopoverOpen(false)}
                                            >
                                                Batal
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="flex-1"
                                                onClick={confirmSave}
                                            >
                                                Ya, Lanjutkan
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
