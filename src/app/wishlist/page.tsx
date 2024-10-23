'use client'
import { removeFromWishList } from "@/lib/features/wishlistSlice";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Header } from "../components/header";
import { BookType } from "../type";

function Wishlist() {
    const wishListItems = useAppSelector((state) => state.wishlist.wishListItems);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (book: BookType) => {
        dispatch(removeFromWishList(book));
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="font-eb_garamond sm:text-4xl font-bold xs:text-2xl pb-6">Wishlist</h1>
                {wishListItems.map((book) => (
                    <div key={book.id} className="flex items-center border-b pb-6 mb-6">
                        <div className="w-1/6">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-24"
                            />
                        </div>
                        <div className="p-2">
                            <h2 className="text-lg font-bold">{book.title}</h2>
                            <p>by {book.author}</p>
                        </div>
                        <div className="ml-auto flex space-x-4">
                            <Link href={`/book/${book.id}`}>
                                <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                sx={{
                                    fontSize: '14px',
                                    padding: '5px 8px',
                                }}
                                >
                                    View Book
                                </Button>
                            </Link>
                            {/* <button
                                onClick={() => handleRemoveFromWishlist(book)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                            >
                                Remove
                            </button> */}
                            <Button
                                variant="contained"
                                color="error"
                                size="medium"
                                onClick={() => handleRemoveFromWishlist(book)}
                                sx={{
                                    fontSize: '14px',
                                    padding: '5px 5px',
                                }}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
                {wishListItems.length === 0 && (
                    <div className="flex flex-col items-start justify-start pt-3">
                        <span className="text-2xl font-serif text-left">
                            No books were added to the wishlist.
                        </span>
                    </div>
                )}
            </div>
            </>

    )
}

export default Wishlist;

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
