'use client'
// import components
import { Header } from '@/app/components/header';
import { HorizontalDisplay } from '@/app/components/horizontalDisplay';
import { useParams } from 'next/navigation';
import useSWR from "swr";

export default function BookDetail() {
    const { id } = useParams();

    const {data:books, error} = useSWR(`http://localhost:3000/api/book`, async (url) => {
        const response = await fetch(url);
            return response.json()
    })

    const bookDetails = books ? books.find((book) => book.id === Number(id)) : null;

    return (
        <>
        <Header />
            <div className="flex justify-center items-start py-10 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row max-w-5xl bg-white rounded-lg shadow-lg p-6">
                    <div className="w-1/3">
                        <img
                            src={bookDetails?.coverImage}
                            alt={bookDetails?.title}
                            className="w-52 h-72 object-cover"
                        />
                    </div>
                    <HorizontalDisplay book={bookDetails} key={books?.id}/>
                </div>
            </div>
        </>
        )
}