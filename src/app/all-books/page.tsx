'use client';
import { BookType } from '@/app/type';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Background } from '../components/background';
import { Header } from '../components/header';
import { Subheader } from '../components/subheader';
import { VerticalDisplay } from '../components/verticalDisplay';
import { processedBook } from '../home/components/bookProcessor';

export default function PageRender() {
    const [limit, setLimit] = useState(() => Number(localStorage.getItem('bookLimit')) || 8);
    const [sortOption, setSortOption] = useState('titleAsc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const { data: book, error, isLoading } = useSWR('http://localhost:3000/api/book', async (url) => {
        const response = await fetch(url);
        return response.json();
    });

    const BookList = book ? book.map((book: BookType) => processedBook(book)) : [];

    // Extract unique genres from the books
    useEffect(() => {
        if (book) {
            const uniqueGenres = new Set<string>();
            book.forEach((book: BookType) => {
                if (book.genres) {
                    book.genres.forEach((genre: string) => uniqueGenres.add(genre));
                }
            });
            setGenres([...uniqueGenres]);
        }
    }, [book]);

    // Handle genre selection
    const handleGenreChange = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    // Filter genres based on search term
    const filteredGenres = genres.filter((genre) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter books based on selected genres
    const filteredBooks = BookList.filter((book) =>
        selectedGenres.length === 0 || selectedGenres.every((genre) => book.genres.includes(genre))
    );

    // Sort books
    const sortBooks = (BookList: BookType[], sortOption: string) => {
        return BookList.sort((a, b) => {
            switch (sortOption) {
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
        });
    };

    const SortedBooks = sortBooks(filteredBooks, sortOption);
    const PaginatedBooks = SortedBooks.slice(0, limit);

    const handleLoadMore = () => {
        const newLimit = limit + 8;
        setLimit(newLimit);
        localStorage.setItem('bookLimit', JSON.stringify(newLimit));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setLimit(8);
        localStorage.removeItem('bookLimit');
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (error) return <div className="font-bold text-2xl justify-center">Error loading results.</div>;
    if (loading) return <div><LinearProgress /></div>;;

    return (
        <>
        <Header />
        <Subheader />
        <Background />
        <div className="p-6 flex flex-col md:flex-row space-x-0 md:space-x-6">
            {/* Genre Checklist */}
            <div className="p-4 border rounded-lg w-full md:w-64 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                <input
                    type="text"
                    placeholder="Search for genres"
                    className="w-full p-2 border rounded mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="space-y-2">
                    {filteredGenres.map((genre) => (
                        <div key={genre}>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    onChange={() => handleGenreChange(genre)}
                                    checked={selectedGenres.includes(genre)}
                                />
                                <span className="font-medium">{genre}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Books Display Section */}
            <div className="flex-1">
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

                {filteredBooks.length === 0 ? (
                <div className="text-center text-gray-500 mt-4">No books available for the selected genres.</div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {PaginatedBooks.map((book: BookType) => (
                                <VerticalDisplay book={book} key={book.id} />
                            ))}
                        </div>
                    )}

                {filteredBooks.length > limit && (
                    <div className="mt-4 flex justify-center pb-4">
                        <button
                            onClick={handleLoadMore}
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                        >
                            Load More
                        </button>
                    </div>
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
            </div>
        </div>
        </>
    );
};
