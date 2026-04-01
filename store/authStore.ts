import { create } from "zustand";


interface AuthState {
    userID: string;
    email: string;
    userName: string;
    avatar: string;
    isLoading: boolean;

    setUserID: (userID: string) => void;
    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setAvatar: (avatar: string) => void;
    setIsLoading: (isLoading: boolean) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userID: "",
    email: "",
    userName: "",
    avatar: "",
    isLoading: true,

    setUserID: (userID: string) => set({ userID }),
    setEmail: (email: string) => set({ email }),
    setUserName: (userName: string) => set({ userName }),
    setAvatar: (avatar: string) => set({ avatar }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),

    logout: () => {
        set({
            userID: "",
            email: "",
            userName: "Không xác định",
            avatar: "/images/noAvata.png",
            isLoading: false
        });
        localStorage.removeItem("accessToken");
    },
}));