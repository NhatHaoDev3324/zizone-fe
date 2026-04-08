'use client';

import { useState } from "react";
import { useSpeech } from "@/hooks/use-speech";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

export type LangType = "vi-VN" | "en-US" | "zh-CN" | "ja-JP";

interface ButtonSpeakProps {
    text: string;
    lang: LangType;
    className?: string;
}

const ButtonSpeak = ({
    text,
    lang,
    className
}: ButtonSpeakProps) => {
    const { speak, isSpeaking } = useSpeech();
    const [rate, setRate] = useState(1);

    return (
        <div className={cn("flex items-center gap-2 py-1 pl-2 pr-1 bg-card border rounded-xl", className)}>
            <button
                disabled={isSpeaking}
                className={cn(
                    "flex-1 px-2 text-black transition-all disabled:text-blue-900",
                )}
                onClick={() => speak(text, lang, rate)}
            >
                {isSpeaking ? (
                    <Volume2 className="animate-pulse" />
                ) : (
                    <Volume2 />
                )}
            </button>

            <Select
                defaultValue="1"
                onValueChange={(v) => setRate(parseFloat(v))}
            >
                <SelectTrigger className="h-10 bg-background rounded-md border text-xs w-20 focus-visible:ring-0">
                    <SelectValue placeholder="1.0x" />
                </SelectTrigger>
                <SelectContent align="start" >
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1.0x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2.0x</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ButtonSpeak;