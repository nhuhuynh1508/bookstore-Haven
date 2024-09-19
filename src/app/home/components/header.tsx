'use client';
import Link from 'next/link';
import { useAppSelector } from "../../../lib/hooks";

export const Header = () => {
    const cartItems = useAppSelector((state) => state.book.cartItems);
    const wishListItems = useAppSelector((state) => state.book.wishListItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishListTotalQuantity = wishListItems.length;
    
    return (
    <div className="w-full bg-slate-300 h-16 sm:h-20 flex items-center px-4 sm:px-8 justify-between fixed top-0 left-0 z-50">
            <div className="flex items-center">
                <Link href="/home" className="flex items-center">
                    <span className="text-black text-2xl sm:text-4xl font-pacifico">Book Haven</span>
                    <img
                        src="/assets/book-icon.png"
                        alt="icon"
                        className="ml-2 sm:ml-4 w-10 h-10 sm:w-16 sm:h-16"
                    />
                </Link>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8">
                <Link href="/shopping" className="relative inline-block">
                    <img
                        src="/assets/cart.png"
                        alt="cart"
                        className="w-10 h-10 sm:w-12 sm:h-10"
                    />
                    <span
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                        style={{ transform: 'translate(50%, -50%)', zIndex: 1 }}
                    >
                        {cartTotalQuantity}
                    </span>
                </Link>
                <Link href="/wishlist" className="relative inline-block">
                <img
                    src="/assets/heart.png"
                    alt="wishlist"
                    className='w-6 h-6 sm:w-8 sm:h-8'
                />
                <span
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                    style={{ transform: 'translate(50%, -50%)', zIndex: 1 }}
                >
                    {wishListTotalQuantity}
                </span>
                </Link>
            </div>
        </div>
    )
}