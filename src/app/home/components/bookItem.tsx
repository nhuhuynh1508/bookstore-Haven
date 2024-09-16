'use client';
import { addToCart, addToWishList, removeFromWishList } from "@/lib/features/bookSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from 'react';

// Define your BookType interface here
interface BookType {
    id: number;
    title: string;
    author: string;
    publication_year: string;
    genre: string[];
    description: string;
    cover_image: string;
    ISBN: string;
    Publisher: string;
    Price: number;
}

interface BookItemProps {
    book: BookType;
}

export const BookItem = (props: BookItemProps) => {
    const { book } = props;
    const dispatch = useAppDispatch();
    const wishList = useAppSelector((state) => state.book.wishListItems);
    const [isInWishList, setIsInWishList] = useState(false);

    useEffect(() => {
        setIsInWishList(wishList.some((item) => item.id === book.id));
    }, [wishList, book.id]);

    const handleAddToCart = () => {
        dispatch(addToCart(book));
    };

    const handleAddToWishList = () => {
        if (isInWishList) {
            dispatch(removeFromWishList(book.id));
            setIsInWishList(false);
        } else {
            dispatch(addToWishList(book));
            setIsInWishList(true);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <img
                src={book.cover_image}
                alt={book.title}
                className="w-full h-72 object-cover mx-auto"
            />
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
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-700">Year: {book.publication_year}</p>
                <p className="text-gray-700">Genre: {book.genre.join(', ')}</p>
                <p className="text-gray-700 font-bold pt-2 text-lg">{book.Price}đ</p>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-gray-500">ISBN: {book.ISBN}</p>
                    <button
                        className="ml-4 bg-blue-500 text-white text-lg px-3 py-1 rounded-full hover:bg-blue-700 flex items-center"
                        onClick={handleAddToCart}
                    >
                        <img
                            src="/assets/shopping-cart.png"
                            alt="cart"
                            style={{ width: '20px', height: '20px' }}
                        />
                        <span className="ml-2">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
