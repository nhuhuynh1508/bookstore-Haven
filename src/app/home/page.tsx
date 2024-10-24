'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { Subheader } from '@/app/components/subheader';
import { VerticalDisplay } from '../components/verticalDisplay';
// import library
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import useSWR from 'swr';
// import type
import { Button } from '@mui/material';
import { Footer } from '../components/footer';
import { BookType } from '../type';

const SearchResult = ({ searchLimit = 5 }) => {
    const searchParams = useSearchParams()
    const search = searchParams.get("search") || ""

    const [limit, setLimit] = useState(() => {
        const savedSearchLimit = localStorage.getItem('searchLimit');
        return savedSearchLimit ? JSON.parse(savedSearchLimit) : searchLimit;
    });

    const {data:book, error} = useSWR(`/api/book`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })
    
    // Search for books based on titles
    const BookList = book ? book.filter((book: BookType) => book.title.toLowerCase().includes(search.toLowerCase())) : [];

    const handleLoadMore = () => {
        const newLimit = limit + 5
        setLimit(newLimit)
        localStorage.setItem('searchLimit', JSON.stringify(newLimit));
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const PaginatedBooks = BookList.slice(0, limit)

    if (error) return <div>Error loading results.</div>;

    return (
        <>
            <Header />
            <Subheader />
            <Background />
            <div className="flex items-center m-3">
                    <span className="xs:text-3xl sm:text-5xl font-eb_garamond font-bold border-gray-300 pb-2 pt-2">Wishlist</span>
                    <hr className="w-full my-2 border-t-2 border-gray-300"/>
                    <hr></hr>
            </div>
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
                            <Button
                                variant='contained'
                                onClick={handleLoadMore}
                                size='medium'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Load More
                            </Button>
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

            {limit >= 10 && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-400 transition"
                    title="Scroll to Top"
                >
                    <img src="/assets/up-arrow.png" className="w-3 h-5" alt="Scroll to Top" />
                </button>
            )}
            <Footer />
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