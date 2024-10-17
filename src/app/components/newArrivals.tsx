import { addToCart } from '@/lib/features/cartSlice';
import { useAppDispatch } from '@/lib/hooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, LinearProgress } from "@mui/material";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    
    // add dispatch
    const dispatch = useAppDispatch();

    // SWR for fetching book data
    const { data: book, error, isLoading } = useSWR('http://localhost:3000/api/book', async (url) => {
        const response = await fetch(url);
        return response.json();
    });

    // Function to generate 5 random unique books
    const generateRandomBooks = (allBooks) => {
        if (allBooks.length > 0) {
            const randomBooks = [];
            const selectedIndices = new Set();

            // Get 5 random books
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

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleAddToCart = (book) => {
        if (session) {
            dispatch(addToCart(book));
        } else {
            alert('You can add to cart after signing in!')
        }
    };


    if (error) return <div className="font-bold text-2xl justify-center">Error loading results.</div>;
    if (loading || isLoading) return <div><LinearProgress /></div>;

    return (
        <div>
            <h2 className="relative inline-block font-lato text-2xl font-bold m-5 px-5 py-2 text-white bg-blue-800 transform -skew-x-12">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 p-2">
                {newArrivals.map((book) => {
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
                            </div>
                            <div className='text-center'>
                                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                                <p className="text-gray-600 mb-2 font-lato">{book.author}</p>
                                <p className="text-orange-700 font-montserrat font-semibold">
                                    {book.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
