'use client';
import Link from 'next/link';
import { useAppSelector } from "../../lib/hooks";

import { SearchBar } from './searchBar';

export const Header = () => {
    const cartItems = useAppSelector((state) => state.book.cartItems);
    const wishListItems = useAppSelector((state) => state.book.wishListItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishListTotalQuantity = wishListItems.length;
    
    return (
    <div className="w-full bg-blue-100 h-16 sm:h-20 flex items-center px-4 justify-between fixed top-0 z-50">
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <span className="pl-10 text-black text-2xl sm:text-4xl xs:text-sm font-pacifico">Book Haven</span>
                    <img
                        src="/assets/book-icon.png"
                        alt="icon"
                        className="ml-2 sm:ml-4 xs:mr-2 w-10 h-10 sm:w-16 sm:h-16"
                    />
                </Link>
            </div>

            <div className='flex flex-grow justify-center'><SearchBar /></div>
            

            <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/shopping" className="relative inline-block">
                    <img
                        src="/assets/cart.png"
                        alt="cart"
                        className="w-10 h-10 sm:w-16 sm:h-14 xs:w-10 xs:h-8"
                    />
                    <span
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 xs:w-4 xs:h-4 flex items-center justify-center"
                    >
                        {cartTotalQuantity}
                    </span>
                </Link>
                <Link href="/wishlist" className="relative inline-block">
                <img
                    src="/assets/heart.png"
                    alt="wishlist"
                    className='w-6 h-6 sm:w-8 sm:h-8 xs:w-6 xs:h-5'
                />
                <span
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 xs:w-4 xs:h-4 flex items-center justify-center"
                    style={{ transform: 'translate(50%, -50%)', zIndex: 1 }}
                >
                    {wishListTotalQuantity}
                </span>
                </Link>
            </div>
        </div>
    )
}