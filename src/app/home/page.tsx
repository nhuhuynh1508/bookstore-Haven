'use client';
import { Background } from '@/app/home/components/background';
import { BookItem } from '@/app/home/components/bookItem';
import { Header } from '@/app/home/components/header';

import useSWR from 'swr';

export interface BookType {
    author: string;
    cover_image: string;
    description: string;
    genre: string[];
    id: number;
    publication_year: number;
    title: string;
    price: number;
}

const Home = () => {
    // const [search, setSearch] = useState("");

    // random price generator
    const generateRandomPrice = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const { data, error } = useSWR('https://freetestapi.com/api/v1/books', async (url) => {
        const response = await fetch(url);
        return response.json();
    });

    const BookList = data?.map((book) => {
        const randomPrice = generateRandomPrice(100000, 500000);
        return {
            ...book,
            price: randomPrice,
        };
    });
    
    return (
        <>
            <Background />
            <Header />
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {BookList?.map((book) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;