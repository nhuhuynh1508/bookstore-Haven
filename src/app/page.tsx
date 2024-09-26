'use client';
import { Background } from '@/app/components/background';
import { BookItem } from '@/app/components/bookItem';
import { Header } from '@/app/components/header';
import { Footer } from './components/footer';
import { processedBook } from './home/components/bookProcessor';

import useSWR from 'swr';
import { BookType } from './type';




const Home = () => {
    const limit = 5;

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books?limit=${limit}`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })

    const BookList = book ? book.map((book: BookType) => processedBook(book)) : [];

    if (error) return <div>Error loading results.</div>;

    
    
    return (
        <>
            <Background />
            <Header />
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {BookList?.map((book: BookType) => (
                        <BookItem book={book} key={book.id} />
                    ))}
                </div>
            </div>
            {book?.length && (
                <div className="mt-4 flex justify-center pb-4">
                <button
                    // onClick={handleLoadMore}
                    className="bg-gray-300 text-black px-4 py-2 rounded">
                    Load More
                </button>
            </div>
            )}
            <Footer />
        </>
    );
}

export default Home;