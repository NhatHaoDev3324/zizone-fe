export type Role = "guest" | "user" | "admin";

export type UserType = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string;
    provider: string;
    role: Role;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}