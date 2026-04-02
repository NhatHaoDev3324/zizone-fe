import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { Role } from "@/@types/userType";



interface DecodedToken {
    id: string | null;
    role: Role;
}

let role: Role = "guest";

const token = localStorage.getItem("accessToken");

if (token) {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        role = decoded.role;
    } catch {
        console.error("Invalid token");
    }
}

interface AuthState {
    userID: string;
    email: string;
    userName: string;
    avatar: string;
    isLoading: boolean;
    role: Role;

    setUserID: (userID: string) => void;
    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setAvatar: (avatar: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    setRole: (role: Role) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

    userID: "",
    email: "",
    userName: "",
    avatar: "",
    isLoading: true,
    role: role,

    setUserID: (userID: string) => set({ userID }),
    setEmail: (email: string) => set({ email }),
    setUserName: (userName: string) => set({ userName }),
    setAvatar: (avatar: string) => set({ avatar }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setRole: (role: Role) => set({ role }),

    logout: () => {
        set({
            userID: "",
            email: "",
            userName: "Không xác định",
            avatar: "/images/noAvata.png",
            isLoading: false,
            role: "guest"
        });
        localStorage.removeItem("accessToken");
    },
}));