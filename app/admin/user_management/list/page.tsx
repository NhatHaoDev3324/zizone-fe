"use client"

import { UserType } from "@/@types/userType";
import { deleteUser, getAllUser } from "@/api/auth"
import { useEffect, useState, useCallback } from "react";
import TableCustom, { Column } from "@/components/customs/TableCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Eye, Trash, User } from "lucide-react";
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
    const [openAlertDelete, setOpenAlertDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        try {
            await deleteUser(userToDelete.id);
            fetchUsers();
            toast.success("Xóa người dùng thành công");
        } catch (error) {
            console.error("Lỗi khi xóa người dùng", error);
            toast.error("Lỗi khi xóa người dùng");
        } finally {
            setOpenAlertDelete(false);
            setUserToDelete(null);
        }
    };

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllUser(search, page, limit);
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
            header: "Hành động",
            accessorKey: (row) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" className="hover:bg-blue-200 dark:hover:bg-blue-900 bg-blue-50 dark:bg-blue-950">
                        <Eye className="size-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="hover:bg-amber-200 dark:hover:bg-amber-900 bg-amber-50 dark:bg-amber-950">
                        <Edit className="size-4 text-amber-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="hover:bg-red-200 dark:hover:bg-red-900 bg-red-50 dark:bg-red-950"
                        onClick={() => {
                            setUserToDelete(row);
                            setOpenAlertDelete(true);
                        }}
                    >
                        <Trash className="size-4 text-red-500" />
                    </Button>
                </div>
            )
        }
    ];



    return (
        <div className="min-h-full">
            <TableCustom
                title="Quản trị người dùng"
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

            <AlertDialog open={openAlertDelete} onOpenChange={setOpenAlertDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">Xác nhận xóa người dùng?</AlertDialogTitle>
                        <AlertDialogDescription className="text-start">
                            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa người dùng
                            <span className="font-bold text-foreground mx-1">{userToDelete?.full_name}</span>
                            khỏi hệ thống?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleDeleteUser}
                        >
                            Xác nhận xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Page
