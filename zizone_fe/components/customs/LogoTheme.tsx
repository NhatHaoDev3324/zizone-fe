"use client"

import { useTheme } from "next-themes";
import Image from "next/image";

const LogoLight = "/logo/logo-dark.svg"
const LogoDark = "/logo/logo-light.svg"

interface LogoThemeProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function LogoTheme({ width = 240, height = 64, className = "w-16 h-16" }: LogoThemeProps) {
    const { theme } = useTheme();
    const Logo = theme === "light" ? LogoLight : LogoDark
    return (
        <Image src={Logo} alt={"Logo"} width={width} height={height} className={className} />
    )
}