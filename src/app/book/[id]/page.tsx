'use client'
// import components
import { Header } from '@/app/components/header';
import { HorizontalDisplay } from '@/app/components/horizontalDisplay';
import { useParams } from 'next/navigation';
import useSWR from "swr";

export default function BookDetail() {
    const { id } = useParams();

    const {data:book, isLoading} = useSWR(`/api/book/${id}`, async (url) => {
        const response = await fetch(url);
            return response.json()
    })


    return (
        <>
            <Header />
            <HorizontalDisplay book={book} key={book?.id} loading={isLoading}/>
        </>
        )
}