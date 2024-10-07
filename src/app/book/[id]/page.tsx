'use client'
// import components
import { Header } from '@/app/components/header';
import { HorizontalDisplay } from '@/app/components/horizontalDisplay';
import { useParams } from 'next/navigation';
import useSWR from "swr";

export default function BookDetail() {
    const { id } = useParams();

    const {data:book, error} = useSWR(`https://freetestapi.com/api/v1/books/${id}`, async (url) => {
        const response = await fetch(url);
            return response.json()
    })

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
                    <HorizontalDisplay book={book} key={book?.id}/>
                </div>
            </div>
        </>
        )
}