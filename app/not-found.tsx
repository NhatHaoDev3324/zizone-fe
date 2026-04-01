"use client";

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src="/images/404.avif" alt="404" width={1024} height={1024} className='w-100 h-auto' />
            <Button variant={"destructive"} size={"lg"} className='rounded-full' onClick={() => router.push("/")}>
                Quay lại trang chủ
            </Button>
        </div>
    )
}