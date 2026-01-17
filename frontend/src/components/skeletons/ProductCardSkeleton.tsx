import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <div className="space-y-4">
            {/* Image Skeleton */}
            <Skeleton className="aspect-square w-full rounded-xl" />

            {/* Content Skeleton */}
            <div className="space-y-2 px-1">
                {/* Category */}
                <Skeleton className="h-3 w-1/3" />

                {/* Title */}
                <Skeleton className="h-4 w-3/4" />

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-10" />
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 pt-1">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
}
