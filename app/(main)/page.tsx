'use client';

import { UserType } from '@/@types/userType';
import { getProfile } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const { setUserID, setEmail, setAvatar, setUserName, logout, setIsLoading } = useAuthStore();
    const hasFetched = useRef(false);

    const token = localStorage.getItem("accessToken");


    useEffect(() => {
        if (!token) {
            logout();
            return;
        }

        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res: UserType = await getProfile();
                setUserID(res.id);
                setEmail(res.email);
                setAvatar(res.avatar);
                setUserName(res.full_name);
            } catch {
                logout();
                return;
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [token, router, setUserID, setEmail, setAvatar, setUserName, logout, setIsLoading]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-2 bg-linear-to-b from-background to-muted/20 relative">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">Zizone</h1>
                <p className="text-lg text-muted-foreground">Welcome to Zizone</p>
            </div>
        </main >
    );
}
