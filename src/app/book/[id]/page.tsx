'use client'


import { Header } from '@/app/home/components/header';
import { useParams } from 'next/navigation';
import useSWR from "swr";

export default function BookDetail() {
    const { id } = useParams();

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books/${id}`, async (url) => {
        const response = await fetch(url);
            return response.json()
    })
    const storedPrice = JSON.parse(localStorage.getItem('price')) || {};
    const price = storedPrice[book?.id] || 0;

    if (!book) return <h3>No Data</h3>
    return (
        <>
        <Header />
            <div className="flex justify-center items-start py-10 bg-gray-50 min-h-screen pt-48">
                <div className="flex flex-col md:flex-row max-w-5xl bg-white rounded-lg shadow-lg p-6">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <img 
                            src={book?.cover_image}
                            alt={book?.title}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                        <div className="md:w-2/3 md:pl-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {book?.title}
                            </h2>

                            <p className="text-gray-600 text-sm mb-1">
                                <strong>ISBN:</strong> {book?.isbn}
                            </p>
                            <p className="text-gray-600 text-sm mb-1">
                                <strong>Genres:</strong> {(book?.genre || []).join(', ')}
                            </p>
                            <p className="text-gray-600 text-sm mb-1">
                                <strong>Publisher:</strong> {book?.publisher}
                            </p>

                            <p className="text-lg font-semibold text-gray-800 mt-4">
                            by {book?.author}
                            </p>

                            <p className="text-gray-700 mt-4">
                            {book?.description}
                            </p>

                            <p className="text-lg font-semibold text-gray-900 mt-6">
                            <strong>Price:</strong> {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
}