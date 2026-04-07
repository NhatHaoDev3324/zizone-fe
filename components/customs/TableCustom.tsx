"use client"

import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Loader2, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Column<T> {
    header: string
    accessorKey: keyof T | ((row: T, index: number) => React.ReactNode)
    className?: string
}

interface TableCustomProps<T> {
    data: T[]
    columns: Column<T>[]
    totalCount: number
    page: number
    limit: number
    search: string
    isLoading?: boolean
    onPageChange: (page: number) => void
    onLimitChange: (limit: number) => void
    onSearchChange: (search: string) => void
    title?: string
    action?: React.ReactNode
}

const TableCustom = <T extends { id: string | number }>({
    data,
    columns,
    totalCount,
    page,
    limit,
    search,
    isLoading,
    onPageChange,
    onLimitChange,
    onSearchChange,
    title,
    action
}: TableCustomProps<T>) => {
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-4 w-full bg-background p-4 rounded-2xl border border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {title && (
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                        <p className="text-sm text-muted-foreground">Tổng cộng {totalCount} kết quả</p>
                    </div>
                )}
                <div className="relative group max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm thông tin..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 h-10 rounded-full bg-slate-50 border-border focus-visible:ring-1 transition-all"
                    />
                </div>
                {action}
            </div>

            <div className="border border-border rounded-md overflow-hidden bg-background">
                <Table>
                    <TableHeader>
                        <TableRow className=" hover:bg-transparent border-border">
                            {columns.map((col, idx) => (
                                <TableHead key={idx} className={cn("h-12 text-foreground font-semibold", col.className)}>
                                    {col.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow className=" hover:bg-transparent border-border">
                                <TableCell colSpan={columns.length} className="h-72 text-center ">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="relative">
                                            <Loader2 className="size-10 animate-spin text-foreground opacity-20" />
                                            <Loader2 className="size-10 animate-spin text-foreground absolute top-0 left-0" />
                                        </div>
                                        <span className="text-sm font-semibold text-muted-foreground tracking-tight">Đang tải dữ liệu...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data && data.length > 0 ? (
                            data.map((row, rowIdx) => (
                                <TableRow key={row.id || rowIdx} className="group border-border dark:hover:bg-input/20 hover:bg-input/10 transition-colors">
                                    {columns.map((col, colIdx) => (
                                        <TableCell key={colIdx} className={cn("py-2.5 text-foreground", col.className)}>
                                            {typeof col.accessorKey === 'function'
                                                ? col.accessorKey(row, rowIdx)
                                                : (row[col.accessorKey] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={columns.length} className="h-72 text-center border-none ">
                                    <p className="text-foreground">Không tìm thấy kết quả phù hợp</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4 ">
                    <span className="text-foreground text-nowrap">Hiển thị</span>
                    <Select value={limit.toString()} onValueChange={(v) => onLimitChange(Number(v))} >
                        <SelectTrigger className="text-foreground min-w-40">
                            <SelectValue placeholder={limit.toString()} />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <span className=" text-foreground text-nowrap">kết quả</span>
                </div>
                <div className="hidden sm:flex items-center ">
                    <span className="text-xs text-foreground">
                        Trang {page} / {totalPages || 1}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Pagination className="w-auto mx-0">
                        <PaginationContent className="gap-2">
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (page > 1) onPageChange(page - 1) }}
                                    className={cn(
                                        "px-4 rounded-xl border text-xs border-border",
                                        page === 1 ? "pointer-events-none opacity-40 grayscale" : "cursor-pointer"
                                    )}
                                    text="Trước"
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (page < totalPages) onPageChange(page + 1) }}
                                    className={cn(
                                        "px-4 rounded-xl border text-xs border-border",
                                        page === totalPages || totalPages === 0 ? "pointer-events-none opacity-40 grayscale" : "cursor-pointer"
                                    )}
                                    text="Sau"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default TableCustom
