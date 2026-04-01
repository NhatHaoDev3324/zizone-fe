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

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [openDialog, setOpenDialog] = React.useState(false);
    return (
        <>
            <Sidebar variant="inset" {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <a href="#">
                                    <LogoTheme className="size-8" width={32} height={32} />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Zizone</span>
                                        <span className="truncate text-xs">Học tiếng Trung hiệu quả</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarMenu>
                            {AdminSidebarItems.map((item) => (
                                <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip={item.title}>
                                            <a href={item.url}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </a>
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
                                                                <SidebarMenuSubButton asChild>
                                                                    <a href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </a>
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
                            <AvatarImage src={"/images/noAvata.png"} alt={"Nguyễn Nhật Hào"} />
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">Nguyễn Nhật Hào</span>
                            <span className="truncate text-xs">nguyennhathao.cm2k4@gmail.com</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarFooter>
            </Sidebar>
            <AlertDialogLogout openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </>
    )
}
