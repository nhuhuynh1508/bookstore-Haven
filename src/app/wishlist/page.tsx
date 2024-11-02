'use client'

// import components
import { useSession } from "next-auth/react";

import { LinearProgress } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { Background } from "../components/background";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Subheader } from "../components/subheader";
import { WishlistItems } from "./components/wishlistItem";


function Wishlist() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // If not authenticated, redirect to the login page
        if (status === "unauthenticated") {
            router.push('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F'); // Adjust the path to your login page
        }
        if (status === "authenticated") {
            router.push('/wishlist');
        }
    }, [status, router]);

    if (status === "loading") return <LinearProgress/>

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Subheader />
            <Background />
            <WishlistItems />
            <Footer />
        </div>
    )
}

export default Wishlist;
