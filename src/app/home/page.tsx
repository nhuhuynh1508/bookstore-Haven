'use client';
import { Background } from '@/app/home/components/background';
import { BookItem } from '@/app/home/components/bookItem';
import { Header } from '@/app/home/components/header';

import { useCallback, useEffect, useState } from 'react';

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

const Home = () => {
    const [bookList, setBookList] = useState<BookType[] | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchBooks = useCallback(async (signal: AbortSignal) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch('https://freetestapi.com/api/v1/books', { signal });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBookList(data);
        } catch (e) {
            setIsError(true);
            if (e instanceof Error) setError(e.message);
            else setError("Unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchBooks(controller.signal);
        return () => controller.abort();
    }, [fetchBooks]);

    return (
        <>
            <Background />
            <Header />
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {bookList?.map((book) => (
                        <BookItem
                            key={book.id}
                            book={book}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
