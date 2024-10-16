"use client"
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./storeProvider";

export default function Provider({ children }) {
    return (
        <SessionProvider>
            <StoreProvider>
                {children}
            </StoreProvider>
        </SessionProvider>
    );
}