"use client";

import { useSyncExternalStore } from "react";

interface MountProviderProps {
    children: React.ReactNode;
}

const emptySubscribe = () => () => { };

const MountProvider = ({ children }: MountProviderProps) => {

    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    if (!isMounted) {
        return null;
    }

    return <>{children}</>;
};

export default MountProvider;

