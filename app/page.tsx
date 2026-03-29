'use client';

import { UserType } from '@/@types/userType';
import { getProfile } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/config/path';
import { Loader2, Mail, Moon, ShieldCheck, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

export default function Home() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const { setUserID, setEmail, setAvatar, setUserName, logout, email, userName, avatar } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    const token = localStorage.getItem("accessToken");


    useEffect(() => {
        if (!token) {
            logout();
            router.replace(PATH.SIGN_IN);
            return;
        }

        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            try {
                const res: UserType = await getProfile();
                setUserID(res.id);
                setEmail(res.email);
                setAvatar(res.avatar);
                setUserName(res.full_name);
            } catch {
                logout();
                router.replace(PATH.SIGN_IN);
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, router, setUserID, setEmail, setAvatar, setUserName, logout]);

    const handleLogout = () => {
        toast.success("Đăng xuất thành công!");
        logout();
        router.replace(PATH.SIGN_IN);
    };



    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground animate-pulse">Đang tải thông tin cá nhân...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-linear-to-b from-background to-muted/20 relative">
            <Button variant={"outline"} size={"icon"} className="absolute top-6 right-1/2 translate-x-1/2 md:right-8 rounded-full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Chào mừng trở lại!</h1>
                    <p className="text-muted-foreground">Bạn đã đăng nhập thành công vào hệ thống.</p>
                </div>

                <Card className="border-primary/20 shadow-xl backdrop-blur-sm gap-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            Thông tin tài khoản
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 py-2 px-4 rounded-lg bg-muted/50 border border-border/50">
                            <div className="rounded-full bg-primary/10">
                                <Image
                                    src={avatar}
                                    alt="Avatar"
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover size-10"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Họ và tên</span>
                                <span className="font-semibold">{userName || "Chưa cập nhật"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 py-2 px-4 rounded-lg bg-muted/50 border border-border/50">
                            <div className="p-2 rounded-full bg-primary/10">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Địa chỉ Email</span>
                                <span className="font-semibold">{email}</span>
                            </div>
                        </div>

                        <div className="pt-2 flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Access Token (Debug)</span>
                            <div className="bg-zinc-950 p-3 rounded-md border border-white/5 overflow-hidden">
                                <code className="text-xs text-zinc-400 break-all leading-tight font-mono block">
                                    {token}
                                </code>
                            </div>
                        </div>

                        <Button
                            variant={"destructive"}
                            onClick={handleLogout}
                            className="w-full"
                        >
                            Đăng xuất
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main >
    );
}
