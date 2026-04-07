"use client"

import { UserType } from "@/@types/userType";
import { createUser, deleteUser, getAllUser } from "@/api/auth";
import TableCustom, { Column } from "@/components/customs/TableCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CreateUserInput, createUserSchema } from "@/lib/validations/createUser";
import { formatDateTime } from "@/utils/formatTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Edit, Eye, Plus, Trash, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    const [openDialog, setOpenDialog] = useState(false);

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

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        clearErrors,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            fullName: "",
            email: "",
            role: "user",
        },
    });

    const handleOpenDialogChange = (open: boolean) => {
        setOpenDialog(open);

        if (!open) {
            reset();
            clearErrors();
        }
    };

    const handleCreateUser = async (data: CreateUserInput) => {
        try {
            const res = await createUser(data.fullName, data.email, data.role);

            if (res?.success === false) {
                throw new Error(res.message || "Thêm mới người dùng thất bại");
            }

            toast.success("Thêm mới người dùng thành công");
            handleOpenDialogChange(false);
            await fetchUsers();
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message =
                error.response?.data?.message ||
                error.message ||
                "Lỗi khi thêm mới người dùng";
            toast.error(message);
        }
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;

        try {
            await deleteUser(userToDelete.id);
            await fetchUsers();
            toast.success("Xóa người dùng thành công");
        } catch (error) {
            console.error("Lỗi khi xóa người dùng", error);
            toast.error("Lỗi khi xóa người dùng");
        } finally {
            setOpenAlertDelete(false);
            setUserToDelete(null);
        }
    };

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
            className: "w-12 text-center",
        },
        {
            header: "Người dùng",
            className: "",
            accessorKey: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar className="size-10 border border-border shadow-sm">
                        <AvatarImage src={row.avatar} className="object-cover" />
                        <AvatarFallback className="bg-background">
                            <User className="size-5 text-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{row.full_name}</span>
                        <span className="text-xs text-muted-foreground">{row.email}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "Vai trò",
            accessorKey: "role",
        },
        {
            header: "Đăng ký qua",
            accessorKey: "provider",
        },
        {
            header: "Ngày tham gia",
            accessorKey: (row) => (
                row.created_at ? formatDateTime(row.created_at) : "N/A"
            ),
        },
        {
            header: "Hành động",
            accessorKey: (row) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="bg-blue-50 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900"
                    >
                        <Eye className="size-4 text-blue-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="bg-amber-50 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900"
                    >
                        <Edit className="size-4 text-amber-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="bg-red-50 hover:bg-red-200 dark:bg-red-950 dark:hover:bg-red-900"
                        onClick={() => {
                            setUserToDelete(row);
                            setOpenAlertDelete(true);
                        }}
                    >
                        <Trash className="size-4 text-red-500" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-full">
            <TableCustom
                title="Danh sách người dùng"
                data={users}
                columns={columns}
                totalCount={totalCount}
                page={page}
                limit={limit}
                search={search}
                isLoading={isLoading}
                onPageChange={(nextPage) => setPage(nextPage)}
                onLimitChange={(nextLimit) => {
                    setLimit(nextLimit);
                    setPage(1);
                }}
                onSearchChange={(nextSearch) => {
                    setSearch(nextSearch);
                    setPage(1);
                }}
                action={
                    <Button size="lg" onClick={() => setOpenDialog(true)}>
                        <Plus />
                        Thêm mới người dùng
                    </Button>
                }
            />

            <AlertDialog open={openAlertDelete} onOpenChange={setOpenAlertDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">
                            Xác nhận xóa người dùng?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-start">
                            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa người dùng
                            <span className="mx-1 font-bold text-foreground">
                                {userToDelete?.full_name}
                            </span>
                            khỏi hệ thống?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDeleteUser}>
                            Xác nhận xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={openDialog} onOpenChange={handleOpenDialogChange}>
                <DialogContent className="min-w-lg">
                    <DialogHeader className="gap-0">
                        <DialogTitle>Thêm mới người dùng</DialogTitle>
                        <DialogDescription>Nhập thông tin người dùng mới</DialogDescription>
                    </DialogHeader>

                    <form
                        id="create-user-form"
                        onSubmit={handleSubmit(handleCreateUser)}
                        className="flex flex-col gap-4"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="full_name">Họ và tên</Label>
                            <Input
                                id="full_name"
                                {...register("fullName", {
                                    onChange: () => clearErrors("fullName"),
                                })}
                            />
                            {errors.fullName && (
                                <p className="text-sm text-destructive">{errors.fullName.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email", {
                                    onChange: () => clearErrors("email"),
                                })}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role">Vai trò</Label>
                            <Controller
                                control={control}
                                name="role"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            clearErrors("role");
                                        }}
                                    >
                                        <SelectTrigger id="role" className="w-full">
                                            <SelectValue placeholder="Chọn vai trò" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">Người dùng</SelectItem>
                                            <SelectItem value="admin">Quản trị viên</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.role && (
                                <p className="text-sm text-destructive">{errors.role.message}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Hủy
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Page;
