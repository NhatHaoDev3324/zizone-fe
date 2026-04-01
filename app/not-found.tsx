"use client";

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
    const router = useRouter();
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        if (theme === "dark") {
            setTheme("light")
        }
    }, [theme, setTheme]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src="/images/404.avif" alt="404" width={1024} height={1024} className='w-100 h-auto' />
            <Button variant={"destructive"} size={"lg"} className='rounded-full' onClick={() => router.push("/")}>
                Quay lại trang chủ
            </Button>
        </div>
    )
}