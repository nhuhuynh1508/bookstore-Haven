'use client';
// import hooks
import { useAppSelector } from "@/lib/hooks";

// import components
import { SearchBar } from '@/app/home/components/searchBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import Link from 'next/link';
import DrawerMenu from "./drawerMenu";

export const Header = () => {
    const cartItems = useAppSelector((state) => state.book.cart.cartItems);
    const wishListItems = useAppSelector((state) => state.book.wishlist.wishListItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishListTotalQuantity = wishListItems.length;
    
    return (
    <div className="w-full bg-blue-300 h-16 sm:h-20 flex items-center px-1 justify-around">
            <div className="flex-shrink-0">
                <DrawerMenu />
            </div>

            <Link href="/" className="flex items-center">
                <span className="text-black flex-shrink-0 text-2xl sm:text-4xl xs:text-sm font-eb_garamond top-0 font-bold">Book Haven</span>
                <img
                    src="/assets/book-icon.png"
                    alt="icon"
                    className="w-10 h-10 sm:w-16 sm:h-16 mr-8"
                />
            </Link>

            <div className='flex flex-grow mx-2 justify-center max-w-1/2'><SearchBar /></div>
            

            <div className="flex items-center space-x-2 sm:space-x-3">
                <Link href="/shopping" className="relative inline-block">
                    <Badge badgeContent={cartTotalQuantity} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', minWidth: '18px', height: '18px' } }}>
                        <ShoppingCartIcon color="action" sx={{ fontSize: 40, sm: { fontSize: 24 } }} />
                    </Badge>
                </Link>
                <Link href="/wishlist" className="relative inline-block">
                    <Badge badgeContent={wishListTotalQuantity} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', minWidth: '18px', height: '18px' } }}>
                        <FavoriteIcon color="action" sx={{ fontSize: 40, sm: { fontSize: 24 } }} />
                    </Badge>
                </Link>
            </div>
        </div>
    )
}