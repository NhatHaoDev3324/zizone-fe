import type { Metadata } from "next";
import "@/style/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/layout/admin/AdminSidebar";
import AdminHeader from "@/components/layout/admin/AdminHeader";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Zizone - Học tiếng Trung online hiệu quả",
    description: "Zizone - Học tiếng Trung online hiệu quả",
    icons: {
        icon: [
            {
                url: "/logo/logo-dark.svg",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/logo/logo-light.svg",
                media: "(prefers-color-scheme: dark)",
            },
        ],
        apple: "/logo/logo-dark.svg",
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset className="flex flex-col h-svh overflow-hidden">
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <AdminHeader />
                    {children}
                </main>
            </SidebarInset>

        </SidebarProvider>
    );
}
