import { TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, LogOut } from "lucide-react"

export const AdminSidebarItems = [
    {
        title: "Playground",
        url: "#",
        icon: (
            <TerminalSquareIcon />
        ),
        isActive: true,
        items: [
            {
                title: "History",
                url: "#",
            },
            {
                title: "Starred",
                url: "#",
            },
            {
                title: "Settings",
                url: "#",
            },
        ],
    },
    {
        title: "Models",
        url: "#",
        icon: (
            <BotIcon />
        ),
        isActive: true,

        items: [
            {
                title: "Genesis",
                url: "#",
            },
            {
                title: "Explorer",
                url: "#",
            },
            {
                title: "Quantum",
                url: "#",
            },
        ],
    },
    {
        title: "Documentation",
        url: "#",
        icon: (
            <BookOpenIcon />
        ),
        isActive: true,

        items: [
            {
                title: "Introduction",
                url: "#",
            },
            {
                title: "Get Started",
                url: "#",
            },
            {
                title: "Tutorials",
                url: "#",
            },
            {
                title: "Changelog",
                url: "#",
            },
        ],
    },
    {
        title: "Settings",
        url: "#",
        icon: (
            <Settings2Icon />
        ),
        isActive: true,

        items: [
            {
                title: "General",
                url: "#",
            },
            {
                title: "Team",
                url: "#",
            },
            {
                title: "Billing",
                url: "#",
            },
            {
                title: "Limits",
                url: "#",
            },
        ],
    },
]