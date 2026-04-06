import { create } from "zustand";
import { Role } from "@/@types/userType";
import { getProfile } from "@/api/auth";

interface AuthState {
    userID: string;
    email: string;
    userName: string;
    avatar: string;
    isLoading: boolean;
    role: Role;
    provider: string;
    createdAt: string;

    setUserID: (userID: string) => void;
    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setAvatar: (avatar: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    setRole: (role: Role) => void;
    setProvider: (provider: string) => void;
    setCreatedAt: (createdAt: string) => void;

    fetchProfile: () => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({

    userID: "Không xác định",
    email: "Không xác định",
    userName: "Không xác định",
    avatar: "/images/noAvata.png",
    isLoading: true,
    role: "guest",
    provider: "Không xác định",
    createdAt: "Không xác định",

    setUserID: (userID: string) => set({ userID }),
    setEmail: (email: string) => set({ email }),
    setUserName: (userName: string) => set({ userName }),
    setAvatar: (avatar: string) => set({ avatar: avatar || "/images/noAvata.png" }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setRole: (role: Role) => set({ role }),
    setProvider: (provider: string) => set({ provider }),
    setCreatedAt: (createdAt: string) => set({ createdAt }),

    fetchProfile: async () => {
        set({ isLoading: true });
        try {
            const res = await getProfile();
            set({
                userID: res.data.id,
                email: res.data.email,
                avatar: res.data.avatar || "/images/noAvata.png",
                userName: res.data.full_name,
                role: res.role,
                provider: res.data.provider,
                createdAt: res.data.created_at,
                isLoading: false
            });
        } catch (error) {
            console.error("Fetch profile failed", error);
            get().logout();
        } finally {
            set({ isLoading: false });
        }
    },

    logout: () => {
        set({
            userID: "",
            email: "",
            userName: "Không xác định",
            avatar: "/images/noAvata.png",
            role: "guest",
            provider: "",
            createdAt: "",
            isLoading: false,
        });
        localStorage.removeItem("accessToken");
    },
}));