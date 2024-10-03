'use client';
import { BookType } from '@/app/type';
import { useState } from 'react';
import useSWR from 'swr';
import { VerticalDisplay } from './verticalDisplay';


export const PageRender = () => {
    const [limit, setLimit] = useState(5)
    const [sortOption, setSortOption] = useState("titleAsc")

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })

    const handleLoadMore = () => {
        setLimit(limit + 5)
    }
    
    const sortBooks = (book: BookType[], sortOption: string) => {
        return book?.sort((a, b) => {
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

    const SortedBooks = sortBooks(book, sortOption)
    const PaginatedBooks = SortedBooks?.slice(0, limit)

    if (error) return <div>Error loading results.</div>;

    return (
        <>
            <div className='p-4'>
                <div className="mb-4">
                    <label className="mr-2">Sort By:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                        <option value="titleAsc">Title: A to Z</option>
                        <option value="titleDesc">Title: Z to A</option>
                    </select>
                </div>

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

        </div>
        </>
    );
}