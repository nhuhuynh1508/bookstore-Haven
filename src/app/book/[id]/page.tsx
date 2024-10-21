'use client'
// import components
import { Header } from '@/app/components/header';
import { HorizontalDisplay } from '@/app/components/horizontalDisplay';
import { useParams } from 'next/navigation';
import useSWR from "swr";

export default function BookDetail() {
    const { id } = useParams();

    const {data:book} = useSWR(`/api/book/${id}`, async (url) => {
        const response = await fetch(url);
            return response.json()
    })


    return (
        <>
        <Header />
            <div className="flex justify-center items-start py-10 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row max-w-5xl bg-white rounded-lg shadow-lg p-6">
                    <div className="w-1/3">
                        <img
                            src={book?.coverImage}
                            alt={book?.title}
                            className="w-52 h-72 object-cover"
                        />
                    </div>
                    <HorizontalDisplay book={book} key={book?.id}/>
                </div>
            </div>
        </>
        )
}