import { useEffect, useState } from 'react';

export const NewArrivals = () => {
    const [books, setBooks] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);

    // Fetch books when the component mounts
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:3000/api/book'); // Adjust the endpoint as needed
            const data = await response.json();
            setBooks(data);
            generateRandomBooks(data); // Generate random books after fetching
        };

        fetchBooks();
    }, []);

    // Function to generate 5 random unique books
    const generateRandomBooks = (allBooks) => {
        if (allBooks.length > 0) {
            const randomBooks = [];
            const selectedIndices = new Set();

            while (randomBooks.length < 5) {
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
            <h2>New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {newArrivals.map((book) => (
                    <div key={book.id} className="border p-4 rounded">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
