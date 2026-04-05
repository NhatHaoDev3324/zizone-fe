import { create } from "zustand";

interface StateStore {
    isChatBotFloating: boolean;
    setIsChatBotFloating: (val: boolean) => void;
}

export const useStateStore = create<StateStore>((set) => ({
    isChatBotFloating: true,
    setIsChatBotFloating: (val) => set({ isChatBotFloating: val }),
}));
