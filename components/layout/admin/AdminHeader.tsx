"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { AdminSidebarItems } from "@/config/AdminSidebarItems";
import Link from "next/link";
import { PATH } from "@/config/path";

const AdminHeader = () => {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();

    const activeItem = AdminSidebarItems.find(item => {
        if (item.url === pathname) return true;
        if (item.items?.some(subItem => subItem.url === pathname)) {
            return true;
        }
        return false;
    });

    const activeSubItem = activeItem?.items?.find(subItem => subItem.url === pathname);

    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b shadow-sm flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center justify-between w-full px-4 ">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Separator
                        orientation="vertical"
                        className="mr-2 "
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink asChild href={PATH.HOME}>
                                    <Link href={PATH.HOME}>
                                        Hệ Thống Zizone
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            {activeItem && !activeSubItem && (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{activeItem.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            )}
                            {activeItem && activeSubItem && (
                                <>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink asChild href={activeItem.url}>
                                            <Link href={activeItem.url}>
                                                {activeItem.title}
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{activeSubItem.title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                            {!activeItem && (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Button variant={"outline"} className="rounded-full" size={"icon"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun /> : <Moon />}
                </Button>
            </div>
        </header>
    );
};

export default AdminHeader;