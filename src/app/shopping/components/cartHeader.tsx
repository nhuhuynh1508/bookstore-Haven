// import components
import { HamburgerMenu } from "@/app/components/hamburgerMenu";
import Link from "next/link";
// import hooks
import { useAppSelector } from "@/lib/hooks";


export const CartHeader = () => {
    const wishListItems = useAppSelector((state) => state.book.wishlist.wishListItems);
    const wishListTotalQuantity = wishListItems.length;
    return (
        <>
        
        <div className="mt-20">
                <img
                    src="/assets/bookcart.jpg"
                    alt="bookstore"
                    className="w-full h-64"
                />
            </div>
            <div className="w-full bg-blue-100 h-16 sm:h-20 flex items-center px-4 justify-between fixed top-0 z-50">
                <HamburgerMenu />
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <span className="text-black text-2xl sm:text-4xl font-pacifico">Book Haven</span>
                        <img
                            src="/assets/book-icon.png"
                            alt="book icon"
                            className="ml-2 sm:ml-4 xs:mr-2 w-10 h-10 sm:w-16 sm:h-16"
                        />
                    </Link>
                </div>
                    <div className="sm:pr-4 items-center">
                    <Link href="/wishlist" className="relative inline-block">
                        <img
                            src="/assets/heart.png"
                            alt="wishlist"
                            className='w-6 h-6 sm:w-8 sm:h-8 xs:w-6 xs:h-6'
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
        </>
    )
}