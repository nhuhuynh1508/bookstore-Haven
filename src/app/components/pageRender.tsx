'use client';
import { BookType } from '@/app/type';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { processedBook } from '../home/components/bookProcessor';
// import { NewArrivals } from './newArrivals';
import { VerticalDisplay } from './verticalDisplay';


export const PageRender = () => {
    const [limit, setLimit] = useState(() => {
        return Number(localStorage.getItem('bookLimit')) || 5;
    })

    const [sortOption, setSortOption] = useState("titleAsc")

    const {data:book, error, isLoading} = useSWR(`http://localhost:3000/api/book`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })


    const BookList = book ? book.map((book: BookType) => processedBook(book)) : [];
    

    const handleLoadMore = () => {
        const newLimit = limit + 5;
        setLimit(newLimit)
        localStorage.setItem('bookLimit',  JSON.stringify(newLimit))
    }

    
    const sortBooks = (BookList: BookType[], sortOption: string) => {
        return BookList?.sort((a, b) => {
            switch(sortOption) {
                case 'priceAsc':
                    return a.price - b.price;
                case 'priceDesc':
                    return b.price - a.price;
                case 'titleAsc':
                    return a.title.localeCompare(b.title);
                case 'titleDesc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        })
    }

    const SortedBooks = sortBooks(BookList, sortOption)
    const PaginatedBooks = SortedBooks?.slice(0, limit)

    // reset cache on page reload
    useEffect(() => {
        setLimit(5);
        localStorage.removeItem('bookLimit');
    }, [])

    

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (error) return <div>Error loading results.</div>;
    if (isLoading) return <div><CircularProgress /></div>;

    return (
    <>
            <div className='p-6'>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <label className="flex items-center mr-2 font-bold">Sort By:</label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border rounded p-2"
                        >
                            <option value="titleAsc">Title: A to Z</option>
                            <option value="titleDesc">Title: Z to A</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* <NewArrivals /> */}
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {PaginatedBooks?.map((book: BookType) => (
                            <VerticalDisplay book={book} key={book.id} />
                        ))}
                    </div>
                </div>

                {book?.length && (
                <div className="mt-4 flex justify-center pb-4">
                    <button
                        onClick={handleLoadMore}
                        className="bg-gray-300 text-black px-4 py-2 rounded">
                        Load More
                    </button>
                </div>
                )}

                {limit >= 10 && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-white text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-400 transition"
                    title="Scroll to Top"
                >
                    <img
                        src="/assets/up-arrow.png"
                        className='w-3 h-5'
                    />
                </button>
                )}

        </div>
        </>
    );
}