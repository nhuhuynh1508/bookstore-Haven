'use client';
import { Background } from '@/app/home/components/background';
import { BookItem } from '@/app/home/components/bookItem';
import { Header } from '@/app/home/components/header';

import { useEffect, useState } from 'react';

interface BookType {
    author: string;
    cover_image: string;
    description: string;
    genre: string[];
    id: number;
    publication_year: number;
    title: string;
    price: number;
}

const Home = () => {
    const [bookList, setBookList] = useState<BookType[] | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // random price generator
    const generateRandomPrice = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
            setIsError(false);
            try {
                const response = await fetch('https://freetestapi.com/api/v1/books');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data:BookType[] = await response.json();
                console.log('hi', data);
                const bookList = data.map((book) => {
                    return {
                        ...book,
                        price: generateRandomPrice(100, 500),
                    };
                });
                console.log('bookList', bookList);
                setBookList(bookList);

                
            } catch (e) {
                setIsError(true);
                if (e instanceof Error) setError(e.message);
                else setError("Unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks();
    }, []);
    
    return (
        <>
            <Background />
            <Header />
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {bookList?.map((book) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;