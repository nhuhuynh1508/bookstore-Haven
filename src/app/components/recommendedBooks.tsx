// import slices
import { addToCart } from '@/lib/features/cartSlice';
import { addToWishList, removeFromWishList } from '@/lib/features/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import '@splidejs/splide/dist/css/splide.min.css';

// import material ui components
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Skeleton } from "@mui/material";
import { Splide, SplideSlide } from '@splidejs/react-splide';

// import components
import Link from "next/link";
import { useEffect, useState } from "react";
import session from 'redux-persist/es/storage/session';
import useSWR from "swr";

export const RecommendedBooks = () => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    
    // Add dispatch
    const dispatch = useAppDispatch();

    const wishList = useAppSelector((state) => state.wishlist.wishListItems);
    const [isInWishList, setIsInWishList] = useState(false);

    // SWR for fetching book data
    const { data: book, error, isLoading } = useSWR(`/api/book`, async (url) => {
        const response = await fetch(url);
        return response.json();
    });

    // Function to generate random unique books
    const generateRandomBooks = (allBooks, currentBookId) => {
        if (allBooks.length > 0) {
            const randomBooks = [];
            const selectedIndices = new Set();

            while (randomBooks.length < 20) {
                const randomIndex = Math.floor(Math.random() * allBooks.length);
                const selectedBook = allBooks[randomIndex];
                if (!selectedIndices.has(randomIndex) && selectedBook.id !== currentBookId) {
                    selectedIndices.add(randomIndex);
                    randomBooks.push(allBooks[randomIndex]);
                }
            }
            setRecommendedBooks(randomBooks);
        }
    };

    // Generate random books when the book data is fetched
    useEffect(() => {
        if (book) {
            const currentBookId = book.id;
            generateRandomBooks(book, currentBookId);
        }
    }, [book]);

    const handleAddToCart = (book) => {
        if (session) {
            dispatch(addToCart(book));
        } else {
            alert('You can add to cart after signing in!');
        }
    };

    // Add to wishlist
    const handleAddToWishList = (book: any, isInWishList: boolean) => {
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
    if (isLoading) {
        return (
            <>
                {[...Array(4)].map((_, index) => (
                    <SplideSlide key={index}>
                        <div className='flex justify-center items-center p-5 relative'>
                            <Skeleton variant="rectangular" width="100%" height={250} className="mb-1" />
                        </div>
                        <div className='flex justify-center m-3'>
                            <Skeleton variant="text" width="70%" height={50} />
                        </div>
                    </SplideSlide>
                ))}
            </>
        );
    }
    

    return (
        <>
            <h2 className="relative inline-block font-lato text-xl font-bold ml-10 mt-5 px-5 py-2 text-white bg-blue-800 transform -skew-x-12">YOU MIGHT ALSO ENJOY</h2>
            <Splide
                    options={{
                        type: 'loop',
                        perPage: 4,
                        pagination: false,
                        arrows: true,
                        autoplay: true,
                        
                    }}
                    >
                {recommendedBooks.map((book) => {
                    
                    const isInWishList = wishList.some((item) => item.id === book.id);
                    return (
                    <SplideSlide key={book.id}>
                        
                            <div className='flex justify-center items-center p-5 relative hover:opacity-75'>
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-full h-auto mb-1"
                                    style={{ height: '250px', objectFit: 'contain' }}
                                />
                                
                                <div className="absolute inset-0 pb-8 flex items-center justify-center space-x-4 opacity-0 hover:opacity-100 transition-opacity">
                                    <Link href={`/book/${book.id}`}>
                                        <IconButton
                                            sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'gray.200' }, boxShadow: 2 }}
                                            aria-label="view"
                                        >
                                            <VisibilityIcon style={{ color: 'gray' }} />
                                        </IconButton>
                                    </Link>
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
                                    className="absolute top-2 right-2 mr-6"
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
                            <div className='text-center m-3'>
                                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                                <p className="text-gray-600 mb-2 font-lato">{book.author}</p>
                                <p className="text-orange-700 font-montserrat font-semibold">
                                    {(book?.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </p>
                            </div>
                    </SplideSlide>
                )})}
            </Splide>
        </>
    );
};
