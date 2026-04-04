"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { logout, fetchProfile } = useAuthStore();
    const hasFetched = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            logout();
            return;
        }

        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchProfile();
    }, [logout, fetchProfile]);

    return <>{children}</>;
}
