import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import type { Product } from "@/types";
import { categories } from "@/mock/products";

interface DialogProductMutationProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingProduct: Product | null;
    onSubmit: (data: ProductFormData) => void;
}

export function DialogProductMutation({
    open,
    onOpenChange,
    editingProduct,
    onSubmit,
}: DialogProductMutationProps) {
    const [savePopoverOpen, setSavePopoverOpen] = useState(false);
    const [newVariant, setNewVariant] = useState("");
    const [variants, setVariants] = useState<string[]>([]);

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
            image: "",
            variants: [],
        },
    });

    const categoryValue = watch("category");

    useEffect(() => {
        if (editingProduct) {
            reset({
                name: editingProduct.name,
                category: editingProduct.category,
                price: editingProduct.price,
                originalPrice: editingProduct.originalPrice || "",
                description: editingProduct.description,
                image: editingProduct.image,
                variants: editingProduct.variants || [],
            });
            setVariants(editingProduct.variants || []);
        } else {
            reset({
                name: "",
                category: "",
                price: 0,
                originalPrice: "",
                description: "",
                image: "",
                variants: [],
            });
            setVariants([]);
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

    const onFormSubmit = () => {
        setSavePopoverOpen(true);
    };

    const confirmSave = () => {
        const data = getValues();
        onSubmit({ ...data, variants });
        setSavePopoverOpen(false);
        onOpenChange(false);
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
                            className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                            <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Kategori</label>
                        <Select
                            value={categoryValue}
                            onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
                        >
                            <SelectTrigger className={`!h-12 w-full ${errors.category ? "border-destructive" : ""}`}>
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Kategori</SelectLabel>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.slug} value={cat.slug}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.category && (
                            <p className="text-xs text-destructive mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Harga</label>
                            <Input
                                type="number"
                                placeholder="0"
                                {...register("price")}
                                className={errors.price ? "border-destructive" : ""}
                            />
                            {errors.price && (
                                <p className="text-xs text-destructive mt-1">{errors.price.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Harga Asli (Opsional)</label>
                            <Input
                                type="number"
                                placeholder="0"
                                {...register("originalPrice")}
                                className={errors.originalPrice ? "border-destructive" : ""}
                            />
                            {errors.originalPrice && (
                                <p className="text-xs text-destructive mt-1">{errors.originalPrice.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">URL Gambar</label>
                        <Input
                            type="url"
                            placeholder="https://..."
                            {...register("image")}
                            className={errors.image ? "border-destructive" : ""}
                        />
                        {errors.image && (
                            <p className="text-xs text-destructive mt-1">{errors.image.message}</p>
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
                            className={errors.description ? "border-destructive" : ""}
                        />
                        {errors.description && (
                            <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                        >
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
    );
}
