'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { Subheader } from '@/app/components/subheader';
import { VerticalDisplay } from '../components/verticalDisplay';
import { processedBook } from './components/bookProcessor';
// import library
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import useSWR from 'swr';
// import type
import { BookType } from '../type';


const SearchResult = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get("search") || ""
    const [limit, setLimit] = useState(5)

    const {data:book, error} = useSWR(
        search ?
        `https://freetestapi.com/api/v1/books?search=${search}` : null, async (url) => {
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
            <Header />
            <Subheader />
            <Background />
            <h1 className="font-eb_garamond font-bold text-4xl p-4">Search Results</h1>
            {search ? (
                // Check if there are any books to display
                BookList.length > 0 ? (
                    <>
                        <h2 className='text-xl pl-4 font-serif'>
                            There are {BookList.length} relevant search results for "{search}"
                        </h2>
                        <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-8 p-10">
                            {PaginatedBooks.map((book: BookType) => (
                                <VerticalDisplay book={book} key={book.id} />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center pb-4">
                            <button
                                onClick={handleLoadMore}
                                className="bg-gray-300 text-black px-4 py-2 rounded">
                                Load More
                            </button>
                        </div>
                    </>
                ) : (
                    // Case when there are no results for the search
                    <h2 className='text-xl pl-4 font-serif flex justify-center'>
                        No results found for "{search}". Please try a different search term.
                    </h2>
                )
            ) : (
                // Message for empty search input
                <div className='text-xl font-serif pl-4'>Please enter a search term to see results.</div>
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