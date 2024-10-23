import { addToCart } from '@/lib/features/cartSlice';
import { addToWishList } from '@/lib/features/wishlistSlice';
import { useAppDispatch } from '@/lib/hooks';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, LinearProgress } from "@mui/material";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const RecommendedBooks = () => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    
    // Add dispatch
    const dispatch = useAppDispatch();

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
        dispatch(addToCart(book));
    };

    const handleAddToWishlist = (book) => {
        dispatch(addToWishList(book));
    };

    if (error) return <div className="flex font-bold text-2xl justify-center">Error loading results.</div>;
    if (isLoading) return <div><LinearProgress /></div>;

    return (
        <div>
            <h2 className="relative inline-block font-lato text-xl font-bold ml-10 mt-5 px-5 py-2 text-white bg-blue-800 transform -skew-x-12">YOU MIGHT ALSO ENJOY</h2>
            <Splide
                options={{
                    type: 'loop',
                    perPage: 4, 
                    pagination: false,
                    arrows: true,
                    autoplay: true,
                    
                }}
                className="p-2"
            >
                {recommendedBooks.map((book) => (
                    <SplideSlide key={book.id}>
                        <Link href={`/book/${book.id}`}>
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

                                    <IconButton
                                        sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'gray.200' }, boxShadow: 2 }}
                                        aria-label="add to wishlist"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleAddToWishlist(book);
                                        }}
                                    >
                                        <FavoriteBorderIcon style={{ color: 'gray' }} />
                                    </IconButton>
                                </div>
                            </div>
                            <div className='text-center m-3'>
                                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                                <p className="text-gray-600 mb-2 font-lato">{book.author}</p>
                                <p className="text-orange-700 font-montserrat font-semibold">
                                    {(book?.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </p>
                            </div>
                        </Link>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};
