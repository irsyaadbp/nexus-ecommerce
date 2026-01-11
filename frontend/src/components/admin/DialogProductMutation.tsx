import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Check, ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import type { Product } from "@/types";
import { useProductCategories } from "@/hooks/useProducts";

// API error format from backend
export type ApiValidationErrors = Record<string, string[]>;

interface DialogProductMutationProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingProduct: Product | null;
    onSubmit: (data: ProductFormData) => void;
    apiErrors?: ApiValidationErrors;
    isPending?: boolean;
}

export function DialogProductMutation({
    open,
    onOpenChange,
    editingProduct,
    onSubmit,
    apiErrors,
    isPending = false,
}: DialogProductMutationProps) {
    const [savePopoverOpen, setSavePopoverOpen] = useState(false);
    const [newVariant, setNewVariant] = useState("");
    const [variants, setVariants] = useState<string[]>([]);
    const [newImage, setNewImage] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const { data: categoriesData } = useProductCategories();
    const categories = categoriesData?.data || [];

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: "",
            category: "",
            price: 0,
            originalPrice: "",
            description: "",
            images: [],
            variants: [],
        },
    });

    const categoryValue = watch("category");

    useEffect(() => {
        if (editingProduct) {
            const productImages = editingProduct.images || [];
            // Transform variants from { name: string }[] to string[]
            const productVariants = editingProduct.variants?.map(v => v.name) || [];
            reset({
                name: editingProduct.name,
                category: editingProduct.category,
                price: editingProduct.price,
                originalPrice: editingProduct.originalPrice || "",
                description: editingProduct.description,
                images: productImages,
                variants: productVariants,
            });
            setVariants(productVariants);
            setImages(productImages);
        } else {
            reset({
                name: "",
                category: "",
                price: 0,
                originalPrice: "",
                description: "",
                images: [],
                variants: [],
            });
            setVariants([]);
            setImages([]);
        }
    }, [editingProduct, reset]);

    const addVariant = () => {
        if (newVariant.trim() && !variants.includes(newVariant.trim())) {
            const updatedVariants = [...variants, newVariant.trim()];
            setVariants(updatedVariants);
            setValue("variants", updatedVariants);
            setNewVariant("");
        }
    };

    const removeVariant = (index: number) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
        setValue("variants", updatedVariants);
    };

    const handleVariantKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addVariant();
        }
    };

    const addImage = () => {
        if (newImage.trim() && !images.includes(newImage.trim())) {
            try {
                new URL(newImage.trim()); // Validate URL
                const updatedImages = [...images, newImage.trim()];
                setImages(updatedImages);
                setValue("images", updatedImages);
                setNewImage("");
            } catch {
                // Invalid URL, don't add
            }
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setValue("images", updatedImages);
    };

    const handleImageKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addImage();
        }
    };

    const onFormSubmit = () => {
        setSavePopoverOpen(true);
    };

    const confirmSave = () => {
        const data = getValues();
        onSubmit({ ...data, variants, images });
        setSavePopoverOpen(false);
    };

    // Helper to get combined error message (form + API)
    const getFieldError = (field: string) => {
        const formError = errors[field as keyof typeof errors]?.message;
        const apiError = apiErrors?.[field]?.[0];
        return formError || apiError;
    };

    const hasFieldError = (field: string) => {
        return !!(errors[field as keyof typeof errors] || apiErrors?.[field]);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="form-group">
                        <label className="form-label">Nama Produk</label>
                        <Input
                            type="text"
                            placeholder="Masukkan nama produk"
                            {...register("name")}
                            className={hasFieldError("name") ? "border-destructive" : ""}
                        />
                        {getFieldError("name") && (
                            <p className="text-xs text-destructive mt-1">{getFieldError("name")}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Kategori</label>
                        <Select
                            value={categoryValue}
                            onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
                        >
                            <SelectTrigger className={`!h-12 w-full ${hasFieldError("category") ? "border-destructive" : ""}`}>
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Kategori</SelectLabel>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {getFieldError("category") && (
                            <p className="text-xs text-destructive mt-1">{getFieldError("category")}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Harga</label>
                            <Input
                                type="number"
                                placeholder="0"
                                {...register("price")}
                                className={hasFieldError("price") ? "border-destructive" : ""}
                            />
                            {getFieldError("price") && (
                                <p className="text-xs text-destructive mt-1">{getFieldError("price")}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Harga Asli (Opsional)</label>
                            <Input
                                type="number"
                                placeholder="0"
                                {...register("originalPrice")}
                                className={hasFieldError("originalPrice") ? "border-destructive" : ""}
                            />
                            {getFieldError("originalPrice") && (
                                <p className="text-xs text-destructive mt-1">{getFieldError("originalPrice")}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">URL Gambar</label>
                        <div className="flex gap-2 mb-2">
                            <Input
                                type="url"
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                onKeyDown={handleImageKeyDown}
                                className="flex-1"
                                placeholder="https://... lalu tekan Enter atau +"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                size="icon-lg"
                                onClick={addImage}
                            >
                                <ImagePlus className="h-4 w-4" />
                            </Button>
                        </div>
                        {images.length > 0 && (
                            <div className="grid grid-cols-4 gap-2">
                                {images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={img}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-16 object-cover rounded-lg border border-border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {getFieldError("images") && (
                            <p className="text-xs text-destructive mt-1">{getFieldError("images")}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Ukuran / Variant</label>
                        <div className="flex gap-2 mb-2">
                            <Input
                                type="text"
                                value={newVariant}
                                onChange={(e) => setNewVariant(e.target.value)}
                                onKeyDown={handleVariantKeyDown}
                                className="flex-1"
                                placeholder="Ketik ukuran lalu tekan Enter atau +"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                size="icon-lg"
                                onClick={addVariant}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {variants.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {variants.map((variant, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                                    >
                                        {variant}
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
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
                            placeholder="Masukkan deskripsi produk"
                            rows={6}
                            {...register("description")}
                            className={hasFieldError("description") ? "border-destructive" : ""}
                        />
                        {getFieldError("description") && (
                            <p className="text-xs text-destructive mt-1">{getFieldError("description")}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            Batal
                        </Button>
                        <Popover open={savePopoverOpen} onOpenChange={setSavePopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button type="submit" className="flex-1" disabled={isPending}>
                                    {isPending ? "Menyimpan..." : (editingProduct ? "Simpan Perubahan" : "Tambah Produk")}
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
    );
}
