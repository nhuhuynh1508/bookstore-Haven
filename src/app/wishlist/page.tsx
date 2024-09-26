'use client'
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { Header } from "../components/header";

function Wishlist() {
    const wishListItems = useAppSelector((state) => state.book.wishListItems);
    return (
        <>
        <Header />
        <div className="container mx-auto p-4 mt-20">
            <h1 className="font-eb_garamond sm:text-4xl font-bold mb-4 xs:text-2xl">Wishlist</h1>
            {wishListItems.map((book) => (
                <div key={book.id} className="flex items-center border-b pb-4 mb-4">
                    <div className="w-1/6">
                        <img
                            src={book.cover_image}
                            alt={book.title}
                            className="w-24 sm:h-32 object-cover xs:h-20"
                        />
                </div>
                <div className="p-2">
                    <h2 className="text-lg font-bold">{book.title}</h2>
                    <p>by {book.author}</p>
                </div>
                <div className="ml-auto">
                    <Link href={`/book/${book.id}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        View Book
                    </Link>
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