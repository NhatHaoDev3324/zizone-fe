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

const AdminHeader = () => {
    const { theme, setTheme } = useTheme();
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
                                <BreadcrumbLink href="#">
                                    Build Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
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