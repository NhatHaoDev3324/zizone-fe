"use client";

import { Button } from "@/components/ui/button";
import { PATH } from "@/config/path";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Languages, Book, Users, Info, Settings } from "lucide-react";

const navItem = [
    {
        icon: <Home className="size-6" />,
        href: PATH.HOME,
    },
    {
        icon: <Languages className="size-6" />,
        label: "Dịch Thuật",
        href: PATH.TRANSLATE,
    },
    {
        icon: <Book className="size-6" />,
        label: "Sổ Tay",
        href: PATH.NOTEBOOK,
    },
    {
        icon: <Users className="size-6" />,
        label: "Cộng Đồng",
        href: PATH.COMMUNITY,
    },
    {
        icon: <Info className="size-6" />,
        label: "Giới Thiệu",
        href: PATH.ABOUT,
    },
    {
        icon: <Settings className="size-6" />,
        label: "Cài Đặt",
        href: PATH.SETTINGS,
    },
]

const Nav = () => {
    const pathname = usePathname();

    return (
        <div className="absolute top-1/2 -left-24 -translate-y-1/2 z-10 w-fit">
            <div className="flex flex-col items-center gap-2 justify-between px-2 py-4 border border-border rounded-full backdrop-blur-md bg-muted/20 ">
                <div className="flex flex-col gap-8">
                    {navItem.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Button key={item.href} variant={active ? "glass" : "ghost"} className="rounded-full size-12" size={"icon"} asChild>
                                <Link href={item.href}>
                                    {item.icon}
                                </Link>
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Nav;