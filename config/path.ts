type path = {
    SIGN_IN: string,
    SIGN_UP: string,
    FORGOT_PASSWORD: string,
    RESET_PASSWORD: string,

    VERIFY_EMAIL: string,

    HOME: string,
    TRANSLATE: string,
    NOTEBOOK: string,
    COMMUNITY: string,
    ABOUT: string,
    SETTINGS: string,

    PROFILE: string,
    CHATBOT: string,

    //Admin
    ADMIN: string,
    ADMIN_DASHBOARD: string,

    ADMIN_WORD_MANAGEMENT: string,
    ADMIN_WORD_MANAGEMENT_CREATE: string,
    ADMIN_WORD_MANAGEMENT_LIST: string,
    ADMIN_WORD_MANAGEMENT_DELETED: string,

    ADMIN_PROFILE_MANAGEMENT: string,

    ADMIN_USER_MANAGEMENT: string,
    ADMIN_USER_MANAGEMENT_LIST: string,
    ADMIN_USER_MANAGEMENT_DELETED: string,

    ADMIN_SYSTEM_CONFIGURATION: string,
}

export const PATH: path = {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",

    VERIFY_EMAIL: "/verify-email",

    HOME: "/",
    TRANSLATE: "/translate",
    NOTEBOOK: "/notebook",
    COMMUNITY: "/community",
    ABOUT: "/about",
    SETTINGS: "/settings",

    PROFILE: "/profile",
    CHATBOT: "/chatbot",

    ADMIN: "/admin",
    ADMIN_DASHBOARD: "/admin/dashboard",

    ADMIN_WORD_MANAGEMENT: "/admin/word_management",
    ADMIN_WORD_MANAGEMENT_CREATE: "/admin/word_management/create",
    ADMIN_WORD_MANAGEMENT_LIST: "/admin/word_management/list",
    ADMIN_WORD_MANAGEMENT_DELETED: "/admin/word_management/deleted",

    ADMIN_PROFILE_MANAGEMENT: "/admin/profile_management",

    ADMIN_USER_MANAGEMENT: "/admin/user_management",
    ADMIN_USER_MANAGEMENT_LIST: "/admin/user_management/list",
    ADMIN_USER_MANAGEMENT_DELETED: "/admin/user_management/deleted",

    ADMIN_SYSTEM_CONFIGURATION: "/admin/system_configuration",
}
