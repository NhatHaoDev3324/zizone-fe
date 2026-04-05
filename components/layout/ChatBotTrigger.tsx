"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { PATH } from "@/config/path"
import Image from "next/image"
import { X } from "lucide-react"
import { useStateStore } from "@/store/stateStore"
import { usePathname } from "next/navigation"

const ChatBotTrigger = () => {
    const { isChatBotFloating, setIsChatBotFloating } = useStateStore();
    const pathname = usePathname();

    if (!isChatBotFloating || pathname === PATH.CHATBOT) return null;

    return (
        <div className="fixed bottom-2 right-3 z-10">
            <div className="relative">
                <Button variant={"glass"} className="rounded-full size-14 shadow-md" size={"icon"} asChild>
                    <Link href={PATH.CHATBOT}>
                        <Image
                            src="/icon/chatbot.png"
                            alt="ChatBot"
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    </Link>
                </Button>
                <Button variant={"ghost"} size={"icon"} className="absolute -top-1 -right-1 rounded-full size-6 bg-muted/60 backdrop-blur-sm border shadow-sm hover:bg-muted text-foreground/70" onClick={() => setIsChatBotFloating(false)}>
                    <X className="size-3" />
                </Button>
            </div>
        </div>
    )
}

export default ChatBotTrigger