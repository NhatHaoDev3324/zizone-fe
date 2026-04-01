import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist_Mono } from "next/font/google";
import "@/style/globals.css";
import { Toaster } from "sonner";
import MountProvider from "@/provider/MountProvider";
import { ThemeProvider } from "@/provider/theme-provider";


const beVietnamPro = Be_Vietnam_Pro({
    subsets: ["latin", "vietnamese"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-be-vietnam-pro",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
};

export const metadata: Metadata = {
    title: "Zizone - Học tiếng Trung online hiệu quả",
    description: "Zizone - Học tiếng Trung online hiệu quả",
    icons: {
        icon: [
            {
                url: "/logo/logo-dark.svg",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/logo/logo-light.svg",
                media: "(prefers-color-scheme: dark)",
            },
        ],
        apple: "/logo/logo-dark.svg",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${beVietnamPro.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <MountProvider>
                        {children}
                        <Toaster />
                    </MountProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
