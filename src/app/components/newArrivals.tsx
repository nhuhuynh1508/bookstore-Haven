import { addToCart } from '@/lib/features/cartSlice';
import { addToWishList, removeFromWishList } from '@/lib/features/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Skeleton } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import session from 'redux-persist/es/storage/session';
import useSWR from "swr";

export const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    
    // Add dispatch
    const dispatch = useAppDispatch();

    const wishList = useAppSelector((state) => state.wishlist.wishListItems);
    const [isInWishList, setIsInWishList] = useState(false);

    // SWR for fetching book data
    const { data: book, error, isLoading } = useSWR('/api/book', async (url) => {
        const response = await fetch(url);
        return response.json();
    });

    // Function to generate random unique books
    const generateRandomBooks = (allBooks: any[]) => {
        if (allBooks.length > 0) {
            const randomBooks = [];
            const selectedIndices = new Set();

            while (randomBooks.length < 10) {
                const randomIndex = Math.floor(Math.random() * allBooks.length);
                if (!selectedIndices.has(randomIndex)) {
                    selectedIndices.add(randomIndex);
                    randomBooks.push(allBooks[randomIndex]);
                }
            }

            setNewArrivals(randomBooks);
        }
    };

    // Generate random books when the book data is fetched
    useEffect(() => {
        if (book) {
            generateRandomBooks(book);
        }
    }, [book]);

    // Add to cart
    const handleAddToCart = (book) => {
        if (session) {
            dispatch(addToCart(book));
        } else {
            alert('You can add to cart after signing in!');
        }
    };

    // Add to wishlist
    const handleAddToWishList = (book, isInWishList) => {
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

    if (error) return <div className="flex font-bold text-2xl justify-center">Error loading results.</div>;
    if (isLoading) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 p-2">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center p-5">
                    <Skeleton variant="rectangular" width="100%" height={250} />
                    <div className='text-center'>
                        <Skeleton variant="text" width="70%" height={30} className="mt-2" />
                        <Skeleton variant="text" width="30%" height={20} className="mt-1" />
                        <Skeleton variant="text" width="50%" height={20} className="mt-1" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <h2 className="relative inline-block font-lato text-2xl font-bold m-5 px-5 py-2 text-white bg-blue-800 transform -skew-x-12">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 p-2">
                {newArrivals.map((book) => {
                    // check if the book is in the wishlist
                    const isInWishList = wishList.some((item) => item.id === book.id);
                    return (
                        <Link key={book.id} href={`/book/${book.id}`}>
                            <div className='flex justify-center items-center p-5 relative hover:opacity-75'>
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-full h-auto mb-1"
                                    style={{ height: '250px', objectFit: 'contain' }}
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
                                            handleAddToCart(book);
                                        }}
                                    >
                                        <ShoppingCartIcon style={{ color: 'gray' }} />
                                    </IconButton>
                                </div>

                                <button
                                    className="absolute top-2 right-2 pl-6"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleAddToWishList(book, isInWishList);
                                    }}
                                >
                                    <img
                                        src={isInWishList ? "/assets/red-heart.png" : "/assets/heart.png"}
                                        alt="wishlist"
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                </button>
                            </div>
                            <div className='text-center'>
                                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                                <p className="text-gray-600 mb-2 font-lato">{book.author}</p>
                                <p className="text-orange-700 font-montserrat font-semibold">
                                    {(book?.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
