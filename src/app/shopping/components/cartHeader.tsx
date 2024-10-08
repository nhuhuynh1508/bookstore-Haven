// import components
import { HamburgerMenu } from "@/app/components/drawerMenu";
import { SearchBar } from "@/app/home/components/searchBar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from "next/link";
// import hooks
import { useAppSelector } from "@/lib/hooks";
import { Badge } from "@mui/material";


export const CartHeader = () => {
    const wishListItems = useAppSelector((state) => state.book.wishlist.wishListItems);
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
                <Link href="/wishlist" className="relative inline-block">
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