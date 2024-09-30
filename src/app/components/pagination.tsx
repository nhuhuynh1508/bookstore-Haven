'use client';
import { BookType } from '@/app/type';
import { Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { processedBook } from '../home/components/bookProcessor';
import { BookItem } from './bookItem';


export const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    
    const page = Number.parseInt(searchParams.get("page")) || 1

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`/?page=${value}`);
    }

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books`, async (url) => {
        const response = await fetch(url);
            return response.json();
    })

    const limit = 5;

    let BookList = book ? book.map((book: BookType) => processedBook(book)) : [];
    BookList = BookList.slice(0 + limit*page, limit + limit*page);

    if (error) return <div>Error loading results.</div>;

    return (
        <>
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {BookList?.map((book: BookType) => (
                        <BookItem book={book} key={book.id} />
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
        </>
    );
}