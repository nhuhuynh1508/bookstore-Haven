'use client';
import { addToCart, addToWishList } from "@/lib/features/bookSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useState } from 'react';
import { BookType } from '../type';

// in case of having a lot of different types
interface BookItemProps {
    book: BookType,
}

export const BookItem = (props: BookItemProps) => {
    const { book } = props;
    const dispatch = useAppDispatch();
    const wishList = useAppSelector((state) => state.book.wishListItems);
    const [isInWishList, setIsInWishList] = useState(false);;
    
    const handleAddToCart = () => {
        dispatch(addToCart(book));
    };

    const handleAddToWishList = () => {
        if (!isInWishList) {
            dispatch(addToWishList(book));
        } else {
            dispatch(addToWishList(book));
        }
        setIsInWishList(!isInWishList)
    };

    const storedISBN = JSON.parse(localStorage.getItem('ISBN')) || {};
    const ISBN = storedISBN[book?.id] || 0;

    return (
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full relative">
                <Link href={`/book/${book.id}`}>
                <img
                    src={book.cover_image}
                    alt={book.title}
                    className="w-full h-72 object-cover hover:opacity-35"
                />
                </Link>
                <button
                    className="absolute top-2 right-2"
                    onClick={handleAddToWishList}
                >
                    <img
                        src={isInWishList ? "/assets/red-heart.png" : "/assets/heart.png"}
                        alt="wishlist"
                        style={{ width: '30px', height: '30px' }}
                    />
                </button>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-700">Author: {book.author}</p>
                    <p className="text-gray-700">Year: {book.publication_year}</p>
                    <p className="text-gray-700">Description: {book.description}</p>
                    <p className="text-gray-700 font-bold pt-2 text-lg">{book.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
                <div className="flex items-center justify-between p-4 border-t">
                    <p className="text-gray-700 truncate">ISBN: {book.ISBN}</p>
                    
                    <button
                        className="ml-4 bg-blue-500 text-white text-lg px-4 py-2 rounded-full hover:bg-blue-700 flex items-center"
                        onClick={handleAddToCart}
                    >
                        <img
                            src="/assets/shopping-cart.png"
                            alt="cart"
                            className="w-5 h-5 pr-1"
                        />
                        <span className="pr-2 md:ml-3 md:pr-3 md:text-base xs:text-xs">Add</span>
                    </button>
                </div>
            </div>
    );
};