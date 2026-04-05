"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, ChevronDown, LogOut, User, Activity, LifeBuoy, CircleQuestionMark, Loader2, Heart, Settings, Home, Languages, Book, Users, Info, Search, X } from "lucide-react";
import { PATH } from "@/config/path";
import { useAuthStore } from "@/store/authStore";
import { useStateStore } from "@/store/stateStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoTheme from "../customs/LogoTheme";
import AlertDialogLogout from "../customs/AlertDialogLogout";
import { Input } from "../ui/input";


const Header = () => {
    const { theme, setTheme } = useTheme();
    const { isChatBotFloating, setIsChatBotFloating } = useStateStore();
    const { userID, userName, email, avatar, isLoading, role } = useAuthStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [openDialogLogout, setOpenDialogLogout] = useState(false);

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full flex flex-row items-center justify-between px-10 py-2 z-10">
            <div className="flex flex-row items-center gap-2">
                <LogoTheme className="w-9 h-9" />
                <span className="text-xl font-bold tracking-tight">Zizone</span>
            </div>

            <div className="absolute top-3 left-1/2 -translate-x-4/7 flex-1 min-w-sm group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/60 group-focus-within:text-foreground transition-colors" />
                <Input
                    placeholder="Tìm kiếm..."
                    className="duration-500 pl-10 h-10 w-full rounded-full border-border/50 bg-background/20 focus-visible:bg-background/40 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-medium placeholder:text-foreground/60 "
                />
            </div>

            <div className="flex flex-row items-center gap-2">
                {!isChatBotFloating && (
                    <div className="relative">
                        <Button variant={"glass"} className="rounded-full size-11 border-border/50 transition-all hover:scale-110 active:scale-95 shadow-sm" size={"icon"} asChild>
                            <Link href={PATH.CHATBOT}>
                                <Image src="/icon/chatbot.png" alt="ChatBot" width={40} height={40} className="rounded-full" />
                            </Link>
                        </Button>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="absolute -top-1 -right-1 rounded-full size-5 bg-muted/80 backdrop-blur-sm border shadow-sm hover:bg-muted text-foreground/70 z-20"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsChatBotFloating(true);
                            }}
                        >
                            <X className="size-3" />
                        </Button>
                    </div>
                )}
                <Button variant={"glass"} className="rounded-full size-11 border-border/50 transition-colors" size={"icon"}>
                    <Heart className="size-5" />
                </Button>
                <Button variant={"glass"} className="rounded-full size-11 border-border/50" size={"icon"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </Button>
                {isLoading ? (
                    <button className={`border border-border rounded-full w-fit pr-2 flex items-center justify-center dark:border-input dark:bg-input/30`}>
                        <div className={"flex flex-row gap-2 items-center"}>
                            <Loader2 className="size-11 animate-spin p-0.5" />
                            <ChevronDown className="size-5" />
                        </div>
                    </button>
                ) : userID ? (
                    <DropdownMenu modal={false} open={dropdownOpen} onOpenChange={setDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <button className={`border border-border/50 rounded-full w-fit pr-4 flex items-center justify-center dark:border-input dark:bg-input/30`}>
                                <div className={"flex flex-row gap-2 items-center"}>
                                    <Image src={avatar || "/images/noAvata.png"} alt={"avatar"} width={100} height={100} className="size-11 p-0.5 rounded-full object-cover" />
                                    <ChevronDown className="size-5" />
                                </div>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit min-w-68 bg-background/90" align="end">
                            <div className="flex flex-col items-center gap-2 pt-6 pb-4 px-4">
                                <Image src={avatar || "/images/noAvata.png"} alt={"avatar"} width={100} height={100} className="size-16 rounded-full object-cover" />
                                <div className="flex flex-col items-center leading-tight">
                                    <span className="font-medium">{userName || "Không xác định"}</span>
                                    <span className="text-sm text-muted-foreground">{email}</span>
                                </div>
                            </div>


                            {role === "admin" && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Hệ Thống</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <Link href={PATH.ADMIN}>
                                            <DropdownMenuItem>
                                                Quản Lý Hệ Thống
                                                <DropdownMenuShortcut><Settings className="size-4" /></DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                </>
                            )}


                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Tài khoản Của Tôi</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <Link href={PATH.PROFILE}>
                                    <DropdownMenuItem>
                                        Xem Hồ Sơ
                                        <DropdownMenuShortcut><User className="size-4" /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </Link>

                                <Link href={"/"}>
                                    <DropdownMenuItem>
                                        Hoạt Động
                                        <DropdownMenuShortcut><Activity className="size-4" /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={"/"}>
                                    <DropdownMenuItem>
                                        Trợ Giúp
                                        <DropdownMenuShortcut><LifeBuoy className="size-4" /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={"/"}>
                                    <DropdownMenuItem>
                                        Câu hỏi thường gặp
                                        <DropdownMenuShortcut><CircleQuestionMark className="size-4" /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </Link>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem className={"text-red-500 cursor-pointer"} onClick={() => setOpenDialogLogout(true)}>
                                    Đăng xuất
                                    <DropdownMenuShortcut><LogOut className="text-red-500 size-4" /></DropdownMenuShortcut>
                                </DropdownMenuItem>

                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button variant={"glass"} className="rounded-full h-11 px-4 border-border/50 hover:bg-background/40" asChild>
                        <Link href={PATH.SIGN_IN}>
                            Đăng nhập
                        </Link>
                    </Button>
                )}
            </div>
            <AlertDialogLogout open={openDialogLogout} setOpen={setOpenDialogLogout} />
        </div >
    );
};

export default Header;