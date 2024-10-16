'use client';
// import hooks
import { useAppSelector } from "@/lib/hooks";

// import components
import { SearchBar } from '@/app/home/components/searchBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import DrawerMenu from "./drawerMenu";

export const Header = () => {
    const { data: session } = useSession();
    const cartItems = useAppSelector((state) => state.book.cart.cartItems);
    const wishListItems = useAppSelector((state) => state.book.wishlist.wishListItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishListTotalQuantity = wishListItems.length;
    
    return (
    <div className="w-full bg-blue-300 h-16 sm:h-20 flex items-center px-2 justify-between">
            <div className="flex-shrink-0">
                <DrawerMenu />
            </div>

            <Link href="/" className="flex items-center m-3">
                <span className="text-blue-800 flex-shrink-0 text-2xl sm:text-4xl xs:text-sm font-pacifico">Book Haven</span>
            </Link>

            <div className='flex flex-grow mx-2 justify-center max-w-1/2'><SearchBar /></div>
            

            <div className="flex items-center space-x-2">
                {session ? (
                    <>
                <Link href="/shopping" className="relative inline-block">
                    <Badge badgeContent={cartTotalQuantity} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', minWidth: '18px', height: '18px' } }}>
                        <ShoppingCartIcon color="action" sx={{ fontSize: 30, sm: { fontSize: 24 }, xs: { fontSize: 16 }  }} />
                    </Badge>
                </Link>
                <Link href="/wishlist" className="relative inline-block">
                    <Badge badgeContent={wishListTotalQuantity} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', minWidth: '18px', height: '18px' } }}>
                        <FavoriteIcon color="action" sx={{ fontSize: 30, sm: { fontSize: 24 }, xs: { fontSize: 16 } }} />
                    </Badge>
                </Link>
                </>
                ) : (
                    <p></p>
                )}
            </div>

            <div className="flex items-center space-x-2">
                {session ? (
                    // Display user profile image if authenticated
                    <>
                        <img
                            src={session.user?.image}
                            alt="User Profile"
                            className="w-10 h-10 rounded-full"
                        />
                    <Button
                        variant="contained"
                        onClick={() => signOut()}
                        size="small"
                        sx={{ borderRadius: '20px' }}
                    >
                        Log out
                    </Button>
                    </>
                ) : (
                    // Display Sign In button if not authenticated
                    <>
                    <Button
                        variant="contained"
                        onClick={() => signIn()}
                        size="small"
                        sx={{ borderRadius: '20px', fontWeight: 'bold' }}
                    >
                        Sign up
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => signIn()}
                        size="small"
                        sx={{ borderRadius: '20px', bgcolor: 'white', color: 'blue', fontWeight: 'bold' }}
                    >
                        Log in
                    </Button>
                </>
                )}
            </div>
        </div>
    )
}