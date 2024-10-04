'use client';

// import type
import { BookType } from '@/app/type';
// import reducers
import { addToCart } from "@/lib/features/cartSlice";
import { addToWishList } from '@/lib/features/wishlistSlice';
// import hooks
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LoadingButton } from '@mui/lab';
// import components
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import { useEffect, useState } from 'react';

// in case of having a lot of different types
interface BookItemProps {
    book: BookType,
}

export const VerticalDisplay = (props: BookItemProps) => {
    const { book } = props;
    const dispatch = useAppDispatch();
    const wishList = useAppSelector((state) => state.book.wishlist.wishListItems);
    const [isInWishList, setIsInWishList] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsInWishList(wishList.some((item) => item.id === book.id));
    }, [wishList, book.id]);
    
    const handleAddToCart = () => {
        if (book) {
            setTimeout(() => {
                setIsLoading(false)
                dispatch(addToCart(book));
                
            }, 1000);
            setIsLoading(true)
        }
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
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full relative hover:shadow-xl">
                <Link href={`/book/${book.id}`}>
                <img
                    src={book.cover_image}
                    alt={book.title}
                    className="w-full h-72 object-cover hover:opacity-35"
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
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-700"><strong>Author:</strong> {book.author}</p>
                    <p className="text-gray-700"><strong>Year:</strong> {book.publication_year}</p>
                    <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
                    <p className="text-gray-700"><strong>Genres:</strong> {(book?.genre || []).join(', ')}</p>
                    <p className="text-gray-700 font-bold pt-2 text-lg font-IBM">{(book?.price || []).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
                <div className="flex items-center justify-between p-4 border-t">
                    <p className="text-gray-700 truncate"><strong>ISBN:</strong> {ISBN}</p>
                    <LoadingButton
                        loading={isLoading}
                        sx={{ borderRadius: '50px'}}
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart();
                        }}
                        startIcon={<ShoppingCartIcon />}
                    >
                    Add
                    </LoadingButton>
                </div>
                </Link>
            </div>
    );
};
