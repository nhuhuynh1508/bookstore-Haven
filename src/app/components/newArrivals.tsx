import Link from "next/link";
import { useEffect, useState } from "react";

export const NewArrivals = () => {

    const [books, setBooks] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:3000/api/book');
            const data = await response.json();
            setBooks(data);
            generateRandomBooks(data);
        };

        fetchBooks();
    }, []);

    // Function to generate 5 random unique books
    const generateRandomBooks = (allBooks) => {
        if (allBooks.length > 0) {
            const randomBooks = [];
            const selectedIndices = new Set();

            while (randomBooks.length < 10) {
                const randomIndex = Math.floor(Math.random() * allBooks.length);

                // Ensure the same book is not selected more than once
                if (!selectedIndices.has(randomIndex)) {
                    selectedIndices.add(randomIndex);
                    randomBooks.push(allBooks[randomIndex]);
                }
            }

            setNewArrivals(randomBooks);
        }
    };

    return (
        <div>
            <h2 className="relative inline-block font-lato text-2xl font-bold m-5 px-5 py-2 text-white bg-cyan-500 transform -skew-x-12">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 p-2">
                {newArrivals.map((book) => {
                    const storedPrice = JSON.parse(localStorage.getItem('price')) || {};
                    const price = storedPrice[book?.id] || 0;
                    return (
                        <Link href={`/book/${book.id}`}>
                        <div key={book.id} className="p-1 text-center">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-auto mb-1"
                                style={{ height: '250px', objectFit: 'contain' }}
                            />
                            <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                            <p className="text-gray-600 mb-2 font-lato">{book.author}</p>
                            <p className="text-orange-700 font-montserrat font-semibold">
                                {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </p>
                        </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
