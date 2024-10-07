'use client';
// import hooks
import { useAppSelector } from "@/lib/hooks";

// import components
import { HamburgerMenu } from "@/app/components/hamburgerMenu";
import { SearchBar } from '@/app/home/components/searchBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import Link from 'next/link';

export const Header = () => {
    const cartItems = useAppSelector((state) => state.book.cart.cartItems);
    const wishListItems = useAppSelector((state) => state.book.wishlist.wishListItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishListTotalQuantity = wishListItems.length;
    
    return (
    <div className="w-full bg-blue-100 h-16 sm:h-20 flex items-center px-4 justify-between">
            <HamburgerMenu />
            
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <span className="text-black text-2xl sm:text-4xl xs:text-sm font-eb_garamond pl-3 top-0 font-bold">Book Haven</span>
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
                    {/* <img
                        src="/assets/cart.png"
                        alt="cart"
                        className="w-10 h-10 sm:w-16 sm:h-14 xs:w-10 xs:h-8"
                    />
                    <span
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 xs:w-4 xs:h-4 flex items-center justify-center"
                    >
                        {cartTotalQuantity}
                    </span> */}
                    <Badge badgeContent={cartTotalQuantity} color="primary">
                        <ShoppingCartIcon color="action" sx={{
                                fontSize: 40,
                            }}/>
                    </Badge>
                </Link>
                <Link href="/wishlist" className="relative inline-block">
                {/* <img
                    src="/assets/heart.png"
                    alt="wishlist"
                    className='w-6 h-6 sm:w-8 sm:h-8 xs:w-6 xs:h-5'
                />
                <span
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 xs:w-4 xs:h-4 flex items-center justify-center"
                    style={{ transform: 'translate(50%, -50%)', zIndex: 1 }}
                >
                    {wishListTotalQuantity} */}
                {/* </span> */}
                <Badge badgeContent={wishListTotalQuantity} color="primary">
                        <FavoriteIcon color="action" sx={{
                                fontSize: 40,
                            }}/>
                    </Badge>
                </Link>
            </div>
        </div>
    )
}