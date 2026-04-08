'use client';

import ButtonSpeak from "@/components/customs/ButtonSpeak";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-[calc(100vh-18rem)] py-10">
            <ButtonSpeak
                text={"你好"}
                lang={"zh-CN"}
            />
        </div >
    );
}