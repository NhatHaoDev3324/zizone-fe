"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, User, Bot, Sparkles, Plus, Image as ImageIcon, Smile, MoreHorizontal, Trash, Trash2 } from "lucide-react"

const Page = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: "bot", content: "Chào bạn! Tôi là Zizone Assistant. Tôi có thể giúp gì cho bạn hôm nay?", time: "09:00" },
        { id: 2, role: "user", content: "Tôi muốn tìm hiểu về các khóa học tiếng Anh giao tiếp.", time: "09:01" },
        { id: 3, role: "bot", content: "Zizone hiện có nhiều khóa học giao tiếp từ cơ bản đến nâng cao. Bạn đã có nền tảng tiếng Anh chưa hay mới bắt đầu học từ đầu?", time: "09:01" },
    ])

    return (
        <div className="flex flex-col h-[calc(100vh-18rem)] w-full mx-auto rounded-2xl border border-border/40 bg-background/20 backdrop-blur-2xl overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-background/20">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="size-10 border border-primary/20 ring-2 ring-primary/10">
                            <AvatarImage src="/icon/chatbot.png" />
                            <AvatarFallback><Bot className="size-5" /></AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background shadow-sm animate-pulse" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg tracking-tight">Trợ lý Zizone</h2>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <Sparkles className="size-3 text-primary" />
                            AI-Powered Helper
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                        <Trash2 className="size-5" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar space-y-6">
                {messages.map((m) => (
                    <div key={m.id} className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className={`size-8 border ${m.role === "user" ? "border-primary/20" : "border-border/40"}`}>
                            {m.role === "user" ? (
                                <AvatarFallback className="bg-primary/10"><User className="size-4 text-primary" /></AvatarFallback>
                            ) : (
                                <AvatarImage src="/icon/chatbot.png" />
                            )}
                        </Avatar>
                        <div className={`flex flex-col gap-1.5 max-w-[75%] ${m.role === "user" ? "items-end" : ""}`}>
                            <div className={`px-4 py-3 rounded-2xl text-sm font-medium shadow-sm transition-all
                                ${m.role === "user"
                                    ? "bg-zizone-main-first-color text-white rounded-tr-none hover:bg-zizone-main-first-color/90"
                                    : "bg-muted/40 backdrop-blur-md border border-border/50 text-foreground rounded-tl-none hover:bg-muted/50"
                                }`}>
                                {m.content}
                            </div>
                            <span className="text-[10px] text-muted-foreground/60 font-medium px-1">
                                {m.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-background/30 backdrop-blur-lg border-t border-border/40">
                <div className="relative group flex items-center gap-2 bg-background/60 dark:bg-muted/20 border border-border/60 rounded-full pl-1 pr-1.5 py-1 transition-all focus-within:bg-background focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5">
                    <Input
                        placeholder="Hãy hỏi tôi bất cứ điều gì..."
                        className="border-0 bg-transparent h-10 shadow-none focus-visible:ring-0 text-[15px] placeholder:text-muted-foreground/60 font-medium flex-1 rounded-l-full rounded-r-xl"
                    />

                    <Button variant={"zizone"} className="rounded-full size-10 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all hover:scale-105 active:scale-95" size="icon">
                        <Send className="size-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page