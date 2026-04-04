import { BookOpenIcon, LayoutDashboardIcon, UserIcon, Users, Settings, Home } from "lucide-react"
import { PATH } from "./path"

export const AdminSidebarItems = [
    {
        title: "Trang chủ",
        url: PATH.HOME,
        icon: (
            <Home />
        ),
    },
    {
        title: "Dashboard",
        url: PATH.ADMIN_DASHBOARD,
        icon: (
            <LayoutDashboardIcon />
        ),
    },
    {
        title: "Quản lý hồ sơ cá nhân",
        url: PATH.ADMIN_PROFILE_MANAGEMENT,
        icon: (
            <UserIcon />
        ),
    },
    {
        title: "Quản lý từ vựng",
        url: PATH.ADMIN_WORD_MANAGEMENT,
        icon: (
            <BookOpenIcon />
        ),
        isActive: true,
        items: [
            {
                title: "Danh sách từ vựng",
                url: PATH.ADMIN_WORD_MANAGEMENT_LIST,
            },
            {
                title: "Tạo từ vựng",
                url: PATH.ADMIN_WORD_MANAGEMENT_CREATE,
            },
            {
                title: "Danh sách từ đã xóa",
                url: PATH.ADMIN_WORD_MANAGEMENT_DELETED,
            },

        ],
    },
    {
        title: "Quản lý người dùng",
        url: PATH.ADMIN_USER_MANAGEMENT,
        icon: (
            <Users />
        ),
        isActive: true,
        items: [
            {
                title: "Danh sách người dùng",
                url: PATH.ADMIN_USER_MANAGEMENT_LIST,
            },
            {
                title: "Tạo tài khoản",
                url: PATH.ADMIN_USER_MANAGEMENT_CREATE,
            },

            {
                title: "Danh sách người dùng đã xóa",
                url: PATH.ADMIN_USER_MANAGEMENT_DELETED,
            },

        ],
    },
    {
        title: "Cấu hình hệ thống",
        url: PATH.ADMIN_SYSTEM_CONFIGURATION,
        icon: (
            <Settings />
        ),
        isActive: true,

        items: [
            {
                title: "Hệ thống",
                url: "#",
            },
            {
                title: "Thanh toán",
                url: "#",
            },
            {
                title: "Giới hạn",
                url: "#",
            },
        ],
    },
]