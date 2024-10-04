'use client';
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import useSWR from 'swr';
import { VerticalDisplay } from '../components/verticalDisplay';
import { BookType } from '../type';
import { processedBook } from './components/bookProcessor';

const SearchResult = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")
    const [limit, setLimit] = useState(5)

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books?search=${search}`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })
    

    const BookList = book ? book.map((book: BookType) => processedBook(book)) : [];

    const handleLoadMore = () => {
        setLimit(limit + 5)
    }

    const PaginatedBooks = BookList.slice(0, limit)

    if (error) return <div>Error loading results.</div>;

    return (
        <>
            <Background />
            <Header />
            <h1 className="font-eb_garamond font-bold text-4xl p-4">Search Results</h1>
            <h2 className='text-lg pl-4 font-serif'>There are {BookList.length} relevant search results for "{search}"</h2>
            <div className="p-4">
                <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-8 mt-6">
                    {PaginatedBooks?.map((book: BookType) => (
                        <VerticalDisplay book={book} key={book.id} />
                    ))}
                </div>
            </div>
            {BookList?.length > 0 && (
                <div className="mt-4 flex justify-center pb-4">
                    <button
                        onClick={handleLoadMore}
                        className="bg-gray-300 text-black px-4 py-2 rounded">
                        Load More
                    </button>
                </div>
            )}
        </>
    )
}

export default function HomeSearch() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResult />
        </Suspense>
    );
}