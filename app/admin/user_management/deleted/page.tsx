"use client"

import { UserType } from "@/@types/userType";
import { getAllDeletedUser, restoreUser } from "@/api/auth"
import { useEffect, useState, useCallback } from "react";
import TableCustom, { Column } from "@/components/customs/TableCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Eye, RefreshCcwDot, Trash, User } from "lucide-react";
import { formatDateTime } from "@/utils/formatTime";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Page = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [openAlertRestore, setOpenAlertRestore] = useState(false);
    const [userToRestore, setUserToRestore] = useState<UserType | null>(null);

    const handleRestoreUser = async () => {
        if (!userToRestore) return;
        try {
            await restoreUser(userToRestore.id);
            fetchUsers();
            toast.success("Khôi phục người dùng thành công");
        } catch (error) {
            console.error("Lỗi khi khôi phục người dùng", error);
            toast.error("Lỗi khi khôi phục người dùng");
        } finally {
            setOpenAlertRestore(false);
            setUserToRestore(null);
        }
    };

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllDeletedUser(search, page, limit);
            if (res && res.data) {
                setUsers(res.data);
                setTotalCount(res.meta?.total || res.data.length);
            } else {
                setUsers([]);
                setTotalCount(0);
            }
        } catch (error) {
            console.error("Fetch users failed", error);
            setUsers([]);
            setTotalCount(0);
        } finally {
            setIsLoading(false);
        }
    }, [search, page, limit]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [fetchUsers]);

    const columns: Column<UserType>[] = [
        {
            header: "STT",
            accessorKey: (_, index) => (
                <span className="font-semibold text-muted-foreground">
                    {(page - 1) * limit + index + 1}
                </span>
            ),
            className: "w-12 text-center"
        },
        {
            header: "Người dùng",
            className: "",
            accessorKey: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar className="size-10 border border-border shadow-sm">
                        <AvatarImage src={row.avatar} className="object-cover" />
                        <AvatarFallback className="bg-background"><User className="size-5 text-foreground" /></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{row.full_name}</span>
                        <span className="text-xs text-muted-foreground">{row.email}</span>
                    </div>
                </div>
            )
        },

        {
            header: "Vai trò",
            accessorKey: "role"
        },
        {
            header: "Đăng ký qua",
            accessorKey: "provider"
        },
        {
            header: "Ngày tham gia",
            accessorKey: (row) => (
                row.created_at ? formatDateTime(row.created_at) : "N/A"
            )
        },
        {
            header: "Ngày bị xóa",
            accessorKey: (row) => (
                row.deleted_at ? formatDateTime(row.deleted_at) : "N/A"
            )
        },
        {
            header: "Hành động",
            accessorKey: (row) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" className="hover:bg-blue-200 dark:hover:bg-blue-900 bg-blue-50 dark:bg-blue-950">
                        <Eye className="size-4 text-blue-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="hover:bg-green-200 dark:hover:bg-green-900 bg-green-50 dark:bg-green-950"
                        onClick={() => {
                            setUserToRestore(row);
                            setOpenAlertRestore(true);
                        }}
                    >
                        <RefreshCcwDot className="size-4 text-green-500" />
                    </Button>
                </div>
            )
        }
    ];



    return (
        <div className="min-h-full">
            <TableCustom
                title="Danh sách người dùng đã bị xóa"
                data={users}
                columns={columns}
                totalCount={totalCount}
                page={page}
                limit={limit}
                search={search}
                isLoading={isLoading}
                onPageChange={(p) => setPage(p)}
                onLimitChange={(l) => { setLimit(l); setPage(1); }}
                onSearchChange={(s) => { setSearch(s); setPage(1); }}
            />

            <AlertDialog open={openAlertRestore} onOpenChange={setOpenAlertRestore}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">Xác nhận khôi phục người dùng?</AlertDialogTitle>
                        <AlertDialogDescription className="text-start">
                            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn khôi phục người dùng
                            <span className="font-bold text-foreground mx-1">{userToRestore?.full_name}</span>
                            vào hệ thống?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRestoreUser}
                        >
                            Xác nhận khôi phục
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Page
