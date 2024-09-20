'use client'

import Link from 'next/link';
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
        <div className="p-4">
        <h2 className="text-lg font-bold">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>Genre: {book.genre.join(", ")}</p>
            <p>Publication Year: {book.publication_year}</p>
            <p>Price: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        <Link href="/home">
            <button className="mt-2 bg-gray-700 text-white p-2 rounded">
                Back to Home
            </button>
        </Link>
        </div>
    )
}