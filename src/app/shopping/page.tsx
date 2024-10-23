'use client';
import { useRouter } from 'next/navigation';
import { Header } from '../components/header';
// import components
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Subheader } from '../components/subheader';
import { Cart } from './components/cart';
import { CartBackground } from './components/cartBackground';


function ShoppingCart() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // If not authenticated, redirect to the login page
        if (status === "unauthenticated") {
            router.push('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F'); // Adjust the path to your login page
        }
    }, [status, router]);
    return (
        <>
            <Header />
            <Subheader />
            <CartBackground />
            <Cart />
        </>
    );
}

export default ShoppingCart;