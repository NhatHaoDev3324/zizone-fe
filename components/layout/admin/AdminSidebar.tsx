"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuAction,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon, LogOut } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AdminSidebarItems } from "@/config/AdminSidebarItems"
import LogoTheme from "@/components/customs/LogoTheme"
import AlertDialogLogout from "@/components/customs/AlertDialogLogout";
import { useAuthStore } from "@/store/authStore"
import { PATH } from "@/config/path"
import { redirect, usePathname } from "next/navigation"
import { getProfile } from "@/api/auth"
import { UserType } from "@/@types/userType"
import Link from "next/link"

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const { setUserID, setEmail, setAvatar, setUserName, logout, setIsLoading, role, avatar, email, userName } = useAuthStore();
    const hasFetched = React.useRef(false);
    const pathname = usePathname();

    if (role !== "admin") {
        redirect(PATH.HOME);
    }

    React.useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            logout();
            return;
        }

        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res: UserType = await getProfile();
                setUserID(res.id);
                setEmail(res.email);
                setAvatar(res.avatar);
                setUserName(res.full_name);
            } catch {
                logout();
                return;
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [setUserID, setEmail, setAvatar, setUserName, logout, setIsLoading]);

    return (
        <>
            <Sidebar variant="inset" {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={PATH.ADMIN_DASHBOARD}>
                                    <LogoTheme className="size-8" width={32} height={32} />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Zizone</span>
                                        <span className="truncate text-xs">Quản trị hệ thống</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarMenu>
                            {AdminSidebarItems.map((item) => (
                                <Collapsible key={item.title} asChild defaultOpen={item.isActive || item.items?.some(subItem => pathname === subItem.url)}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                                            <Link href={item.url}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                        {item.items?.length ? (
                                            <>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                        <ChevronRightIcon
                                                        />
                                                        <span className="sr-only">Toggle</span>
                                                    </SidebarMenuAction>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items?.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                                                    <Link href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </>
                                        ) : null}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={"Đăng xuất"} className="text-red-500 hover:text-red-600 active:text-red-600 cursor-pointer" onClick={() => setOpenDialog(true)}>
                                    <div className="flex items-center gap-2 ">
                                        <LogOut />
                                        <span>Đăng xuất</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={avatar} alt={userName} />
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{userName}</span>
                            <span className="truncate text-xs">{email}</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarFooter>
            </Sidebar>
            <AlertDialogLogout open={openDialog} setOpen={setOpenDialog} />
        </>
    )
}
