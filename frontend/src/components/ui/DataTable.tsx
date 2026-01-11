/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export interface DataTableColumn<T> {
    title: string;
    key: string;
    render?: (value: any, item: T) => React.ReactNode;
    className?: string; // Optional header className
    cellClassName?: string; // Optional cell className
}

interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    page: number;
    totalPage: number;
    onChangePage: (page: number) => void;
    className?: string;
}

const getValue = (obj: any, path: string): any => {
    if (!path) return undefined;
    if (!path.includes(".")) return obj[path];
    return path.split(".").reduce((acc: any, part) => acc && acc[part], obj);
};

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    page,
    totalPage,
    onChangePage,
    className,
}: DataTableProps<T>) {
    const handlePrevious = (e: React.MouseEvent) => {
        e.preventDefault();
        if (page > 1) onChangePage(page - 1);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        if (page < totalPage) onChangePage(page + 1);
    };

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPage <= maxVisible) {
            for (let i = 1; i <= totalPage; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push("ellipsis-1");

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPage - 1, page + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (page < totalPage - 2) pages.push("ellipsis-2");
            if (!pages.includes(totalPage)) pages.push(totalPage);
        }
        return pages;
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="data-table-wrapper overflow-x-auto">
                <table className="data-table">
                    <thead className="data-table-header">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={`${column.key}-${index}`}
                                    className={cn("data-table-header-cell", column.className)}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="data-table-cell text-center py-10 text-muted-foreground">
                                    Tidak ada data ditemukan.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr key={item.id || rowIndex} className="data-table-row">
                                    {columns.map((column, colIndex) => {
                                        const value = getValue(item, column.key);
                                        return (
                                            <td
                                                key={`${column.key}-${colIndex}`}
                                                className={cn("data-table-cell", column.cellClassName)}
                                            >
                                                {column.render ? column.render(value, item) : (value as React.ReactNode)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPage > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                        Halaman {page} dari {totalPage}
                    </div>
                    <Pagination className="w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={handlePrevious}
                                    className={cn(page <= 1 && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>

                            {getPageNumbers().map((p, i) => (
                                <PaginationItem key={i}>
                                    {typeof p === "number" ? (
                                        <PaginationLink
                                            href="#"
                                            isActive={page === p}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onChangePage(p);
                                            }}
                                        >
                                            {p}
                                        </PaginationLink>
                                    ) : (
                                        <PaginationEllipsis />
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={handleNext}
                                    className={cn(page >= totalPage && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
