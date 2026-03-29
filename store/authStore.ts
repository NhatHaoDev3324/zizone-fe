import { create } from "zustand";


interface AuthState {
    userID: string;
    email: string;
    userName: string;
    avatar: string;

    setUserID: (userID: string) => void;
    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setAvatar: (avatar: string) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userID: "",
    email: "",
    userName: "",
    avatar: "",

    setUserID: (userID: string) => set({ userID }),
    setEmail: (email: string) => set({ email }),
    setUserName: (userName: string) => set({ userName }),
    setAvatar: (avatar: string) => set({ avatar }),

    logout: () => {
        set({
            userID: "",
            email: "",
            userName: "Không xác định",
            avatar: "/images/noAvata.png"
        });
        localStorage.removeItem("accessToken");
    },
}));