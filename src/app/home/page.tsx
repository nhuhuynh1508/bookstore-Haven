'use client';
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import useSWR from 'swr';
import { BookItem } from '../components/bookItem';
import { BookType } from '../type';
import { processedBook } from './components/bookProcessor';

const Result = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books?search=${search}`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })
    const totalBook = book?.length;
    const BookList = book ? book.map((book: BookType) => processedBook(book)) : [];

    if (error) return <div>Error loading results.</div>;

    return (
        <>
            <Background />
            <Header />
            <h1 className="font-eb_garamond font-bold text-4xl p-4">Search Results</h1>
            <h2 className='text-lg pl-4 font-serif'>There are {totalBook} relevant search results for "{search}"</h2>
            <div className="p-4">
            <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-8 mt-6">
                    {BookList?.map((book: BookType) => (
                        <BookItem book={book} key={book.id} />
                    ))}
                
                </div>
            </div>
        </>
    )
}

export default function HomeSearch() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Result />
        </Suspense>
    );
}