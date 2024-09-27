'use client';
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import useSWR from 'swr';

const Result = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books?search=${search}`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })
    const totalBook = book?.length;

    if (error) return <div>Error loading results.</div>;

    return (
        <>
            <Background />
            <Header />
            <h1 className="font-eb_garamond font-bold text-2xl p-4">Search Results</h1>
            <h2 className='text-lg pl-4 font-serif'>There are {totalBook} relevant search results for "{search}"</h2>
            <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
                {book?.map((book) => (
                    <div key={book.id}
                        className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg'>
                        <Link href={`/book/${book.id}`}>
                            <img
                                src={book.cover_image}
                                alt={book.title}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                        </Link>
                        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                        <p className="text-gray-700 mb-1">Author: {book.author}</p>
                        <p className="text-gray-700 mb-2">Year: {book.publication_year}</p>
                    </div>
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