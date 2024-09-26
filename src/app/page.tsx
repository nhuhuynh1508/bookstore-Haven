'use client';
import { Background } from '@/app/components/background';
import { BookItem } from '@/app/components/bookItem';
import { Header } from '@/app/components/header';

import { useState } from 'react';
import useSWR from 'swr';
import { BookType } from './type';

// random price generator
const generateRandomPrice = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// random ISBN generator
const generateRandomISBN = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 100000) + min);
};

const Home = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const limit = 5;

    // useEffect(()=>{
    //     const fetcher = async () => {
    //         console.log('resultData1')
    //         const resultData = await fetch('https://api.itbook.store/1.0/search/mongodb');
    //         console.log('resultData')
    //         return resultData;
    //     }
    
    //     fetcher();
    // },[])
    const {data:book, error} = useSWR('https://freetestapi.com/api/v1/books', async (url) => {
        const response = await fetch(url);
            return response.json();
    })


    const BookList = book?.slice((pageIndex - 1) * limit, pageIndex * limit).map((book: BookType) => {
        const storedPrice = JSON.parse(localStorage.getItem('price')) || {};
        const storedISBN = JSON.parse(localStorage.getItem('ISBN')) || {};
        // retrieve the price from local storage if it exists, if not generate a random price
        const randomPrice = storedPrice[book.id] || generateRandomPrice(100000, 500000);
        // retrieve the ISBN from local storage if exists, if not generate a random price
        const randomISBN = storedISBN[book.id] || generateRandomISBN(100000000000, 900000000000);

        if (!storedPrice[book.id]) {
            localStorage.setItem('price', JSON.stringify({ ...storedPrice, [book.id]: randomPrice }));
        }
        
        if (!storedISBN[book.id]) {
            localStorage.setItem('ISBN', JSON.stringify({ ...storedISBN, [book.id]: randomISBN }));
        }
        return {
            ...book,
            price: randomPrice,
            ISBN: randomISBN,
            };
        }
    );
    
    const totalPages = Math.ceil(book?.length / limit);
        
    const handleNextPage = () => {
        if (pageIndex < totalPages) {
            setPageIndex((prev) => prev + 1);
        }
    };
    
    const handlePreviousPage = () => {
        if (pageIndex > 1) {
            setPageIndex((prev) => prev - 1);
        }
    };
    
    return (
        <>
            <Background />
            <Header />
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {BookList?.map((book: BookType) => (
                            <BookItem book={book} key={book.id} />
                    ))}
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                    <button onClick={handlePreviousPage} className="bg-gray-300 text-black px-4 py-2 rounded">Previous</button>
                    <button>Page {pageIndex}</button>
                    <button onClick={handleNextPage} className="bg-gray-300 text-black px-4 py-2 rounded">Next</button>
            </div>
        </>
    );
}

export default Home;