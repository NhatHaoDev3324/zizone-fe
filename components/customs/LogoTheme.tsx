"use client"

import Image from "next/image";

const LogoLight = "/logo/logo-dark.svg"
const LogoDark = "/logo/logo-light.svg"

interface LogoThemeProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function LogoTheme({ width = 240, height = 64, className = "w-16 h-16" }: LogoThemeProps) {
    return (
        <>
            <Image
                src={LogoLight}
                alt="Logo Light"
                width={width}
                height={height}
                className={`${className} dark:hidden`}
                priority
            />
            <Image
                src={LogoDark}
                alt="Logo Dark"
                width={width}
                height={height}
                className={`${className} hidden dark:block`}
                priority
            />
        </>
    )
}