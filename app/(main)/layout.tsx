import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import ChatBotTrigger from "@/components/layout/ChatBotTrigger";

export const metadata: Metadata = {
    openGraph: {
        images: ["/images/background/background2.jpg"],
    },
};

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
                <Image
                    src="/images/background/background3.png"
                    alt="Layout Background"
                    fill
                    className="object-cover opacity-80 transition-opacity"
                    priority
                />
            </div>


            <main className="absolute w-4/6 h-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 border border-border rounded-[40px]  backdrop-blur-md bg-muted/20">
                <Header />
                <div className="top-18 mx-4 my-2 flex min-h-[calc(100vh-18rem)] flex-col relative">
                    {children}
                </div>
                <Nav />
                <ChatBotTrigger />
            </main>

        </div>
    );
}
