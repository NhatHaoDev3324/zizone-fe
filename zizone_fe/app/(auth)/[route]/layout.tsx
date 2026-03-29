"use client";

import "@/style/globals.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { PATH } from "@/config/path";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    return (
        <div className={`h-screen w-screen flex flex-col antialiased overflow-hidden `}>
            <main className="flex-1 overflow-auto flex relative">

                <div className="absolute top-8 left-4 md:left-8 z-20 flex items-center gap-2">
                    <Button onClick={() => router.push(PATH.HOME)} variant={"outline"} className="backdrop-blur-xl border bg-muted/20 text-foreground hover:bg-muted-foreground/20">
                        <ArrowLeft />
                        Quay lại trang chủ
                    </Button>
                    <Button size={"icon"} variant={"outline"} className="backdrop-blur-xl border bg-muted/20 text-foreground hover:bg-muted-foreground/20" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <Sun /> : <Moon />}
                    </Button>
                </div>

                <div className="w-full absolute z-10 top-0 left-0 right-0 bottom-0 select-none md:mb-8">
                    {children}
                </div>

                <div className="absolute bottom-0 h-12 w-full backdrop-blur-xl border bg-muted/20 text-foreground">
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Design & Code by <span className="text-foreground font-medium cursor-pointer">Zizone Team</span></p>
                    </div>
                </div>
            </main>
        </div>
    );
}
