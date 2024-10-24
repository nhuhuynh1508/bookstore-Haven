'use client';

// import type
import { BookType } from '@/app/type';
// import reducers
import { addToCart } from "@/lib/features/cartSlice";
import { addToWishList, removeFromWishList } from '@/lib/features/wishlistSlice';
// import hooks
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import components
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useEffect, useState } from 'react';

// in case of having a lot of different types
interface BookItemProps {
    book: BookType,
}

export const VerticalDisplay = (props: BookItemProps) => {
    const { book } = props;
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const wishList = useAppSelector((state) => state.wishlist.wishListItems);
    const [isInWishList, setIsInWishList] = useState(false);

    useEffect(() => {
        setIsInWishList(wishList.some((item) => item.id === book.id));
    }, [wishList, book.id]);
    
    const handleAddToCart = () => {
        if (session) {
            dispatch(addToCart(book));
        } else {
            alert('You can add to cart after signing in!')
        }
        
    };

    const handleAddToWishList = () => {
        if (session) {
            if (!isInWishList) {
                dispatch(addToWishList(book));
            } else {
                dispatch(removeFromWishList(book));
            }
            setIsInWishList(!isInWishList)
        } else {
            alert('You can add to wishlist after signing in!')
        }
    };

    return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full relative hover:shadow-xl">
                <Link href={`/book/${book.id}`}>
                    <div className="flex justify-center items-center p-5">
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-32 h-48 object-cover hover:opacity-75 transition-opacity duration-300"
                        />

                        <div className="absolute inset-0 pb-8 flex items-center justify-center space-x-4 opacity-0 hover:opacity-100 transition-opacity">
                            <IconButton
                                sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'gray.200' }, boxShadow: 2 }}
                                aria-label="view"
                            >
                                <VisibilityIcon style={{ color: 'gray' }} />
                            </IconButton>
                    
                            <IconButton
                                sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'gray.200' }, boxShadow: 2 }}
                                aria-label="add to cart"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAddToCart();
                                }}
                            >
                                <ShoppingCartIcon style={{ color: 'gray' }} />
                            </IconButton>
                        </div>
                    </div>
                
                <button
                    className="absolute top-2 right-2 pl-6"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToWishList();
                    }}
                >
                    <img
                        src={isInWishList ? "/assets/red-heart.png" : "/assets/heart.png"}
                        alt="wishlist"
                        style={{ width: '30px', height: '30px' }}
                    />
                </button>
                
                <div className="p-3 flex flex-col flex-grow text-sm">
                    <h3 className="text-xl font-semibold p-1">{book.title}</h3>
                    <p className="text-gray-700 p-1"><strong>Author:</strong> {book.author}</p>
                    <p className="text-gray-700 p-1"><strong>Year:</strong> {book.publicationYear}</p>
                    <p className="text-gray-700 p-1"><strong>ISBN:</strong> {book.ISBN}</p>
                    <p className="text-gray-700 p-1"><strong>Genres:</strong> {(book.genres || []).join(', ')}</p>
                    <p className="text-gray-700 font-bold text-lg font-IBM p-1">
                        {(book?.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                </div>
                <div className="fixed items-center justify-end p-4 border-t">
                    
                </div>
                </Link>
            </div>
        );
};
