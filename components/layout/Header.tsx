"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, ChevronDown, LogOut, User, Activity, LifeBuoy, CircleQuestionMark, Loader2, Heart } from "lucide-react";
import { PATH } from "@/config/path";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
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
const navItem = [
    {
        label: "Trang Chủ",
        href: PATH.HOME,
    },
    {
        label: "Dịch Thuật",
        href: PATH.TRANSLATE,
    },
    {
        label: "Sổ Tay",
        href: PATH.NOTEBOOK,
    },
    {
        label: "Cộng Đồng",
        href: PATH.COMMUNITY,
    },
    {
        label: "Giới Thiệu",
        href: PATH.ABOUT,
    },
    {
        label: "Liên Hệ",
        href: PATH.CONTACT,
    },
]

const Header = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const { userID, userName, email, avatar, isLoading, logout } = useAuthStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="absolute top-4 right-1/2 translate-x-1/2 z-10 w-full max-w-7xl">
            <div className="flex items-center gap-2 justify-between px-4 py-2 border border-border rounded-full backdrop-blur-sm">
                <LogoTheme className="w-8 h-8" />
                <div className="flex items-center gap-2">
                    {navItem.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Button key={item.href} variant={active ? "outline" : "ghost"} className="rounded-full" onClick={() => router.push(item.href)}>
                                {item.label}
                            </Button>
                        )
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={"outline"} className="rounded-full" size={"icon"}>
                        <Heart />
                    </Button>
                    <Button variant={"outline"} className="rounded-full" size={"icon"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <Sun /> : <Moon />}
                    </Button>
                    {isLoading ? (
                        <button className={`border border-border rounded-full w-fit pr-2 flex items-center justify-center dark:border-input dark:bg-input/30`}>
                            <div className={"flex flex-row gap-2 items-center"}>
                                <Loader2 className="size-8 animate-spin p-0.5" />
                                <ChevronDown className="size-4" />
                            </div>
                        </button>
                    ) : userID ? (
                        <DropdownMenu modal={false} open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <button className={`border border-border rounded-full w-fit pr-2 flex items-center justify-center dark:border-input dark:bg-input/30`}>
                                    <div className={"flex flex-row gap-2 items-center"}>
                                        <Image src={avatar || "/images/noAvata.png"} alt={"avatar"} width={100} height={100} className="size-8 p-0.5 rounded-full object-cover" />
                                        <ChevronDown className="size-4" />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-fit" align="end">
                                <div className="flex flex-col items-center gap-2 pt-6 pb-4 px-4">
                                    <Image src={avatar || "/images/noAvata.png"} alt={"avatar"} width={100} height={100} className="size-16 rounded-full object-cover" />
                                    <div className="flex flex-col items-center leading-tight">
                                        <span className="font-medium">{userName || "Không xác định"}</span>
                                        <span className="text-sm text-muted-foreground">{email}</span>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <Link href={"/"}>
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
                                    <DropdownMenuItem className={"text-red-500 cursor-pointer"} onClick={() => logout()}>
                                        Đăng xuất
                                        <DropdownMenuShortcut><LogOut className="text-red-500 size-4" /></DropdownMenuShortcut>
                                    </DropdownMenuItem>

                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant={"outline"} className="rounded-full" onClick={() => router.push(PATH.SIGN_IN)}>
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;