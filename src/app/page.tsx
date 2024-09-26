'use client';
import { Background } from '@/app/components/background';
import { BookItem } from '@/app/components/bookItem';
import { Header } from '@/app/components/header';
import { processedBook } from './home/components/bookProcessor';

import { useState } from 'react';
import useSWR from 'swr';
import { BookType } from './type';



const Home = () => {
    const [visibleBookCount, setvisibleBookCount] = useState(5);
    const limit = 5;

    const {data:book, error} = useSWR('https://freetestapi.com/api/v1/books', async (url) => {
        const response = await fetch(url);
            return response.json();
    })

    const processedBooks = (() => {
        if (book) {
            return book.map(processedBook);
        }
        return [];
    })();

    const handleLoadMore = () => {
        setvisibleBookCount((prevCount) => prevCount + limit)
    }
    
    return (
        <>
            <Background />
            <Header />
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {processedBooks.slice(0, visibleBookCount).map((book: BookType) => (
                        <BookItem book={book} key={book.id} />
                    ))}
                </div>
            </div>
            {visibleBookCount < book?.length && (
                <div className="mt-4 flex justify-center pb-4">
                <button
                    onClick={handleLoadMore}
                    className="bg-gray-300 text-black px-4 py-2 rounded">
                    Load More
                </button>
            </div>
            )}
        </>
    );
}

export default Home;