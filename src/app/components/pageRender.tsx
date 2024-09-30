'use client';
import { BookType } from '@/app/type';
import { Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import { processedBook } from '../home/components/bookProcessor';
import { VerticalDisplay } from './verticalDisplay';


export const PageRender = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    
    const page = Number.parseInt(searchParams.get("page")) || 1

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`/?page=${value}`);
    }

    const [sortOption, setSortOption] = useState("titleAsc")

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })

    const sortBooks = (books) => {
        return books.sort((a, b) => {
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

    const limit = 5;

    let BookList = book ? book.map((book: BookType) => processedBook(book)) : [];
    BookList = BookList.slice(0 + limit*page, limit + limit*page);
    BookList = sortBooks(BookList)

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
                        {BookList?.map((book: BookType) => (
                            <VerticalDisplay book={book} key={book.id} />
                        ))}
                    </div>
                </div>

                <Pagination
                    count={9}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChange}
                    className='flex justify-center m-4'
                />
        </div>
        </>
    );
}