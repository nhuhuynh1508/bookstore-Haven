'use client'
import { Footer } from '@/app/components/footer';
// import components
import { Header } from '@/app/components/header';
import { HorizontalDisplay } from '@/app/components/horizontalDisplay';
import { RecommendedBooks } from '@/app/components/recommendedBooks';
import { useParams } from 'next/navigation';
import useSWR from "swr";

const BookDetail = () => {
    const { id } = useParams();

    const {data:book, isLoading} = useSWR(`/api/book/${id}`, async (url) => {
        const response = await fetch(url);
            return response.json()
    })

    return (
        <>
            <Header />
            <HorizontalDisplay book={book} key={book?.id} loading={isLoading}/>
            <div className="flex justify-center m-10">
                <img
                    src="/assets/banner1.jpg"
                    alt="banner"
                    className="w-auto h-50 object-cover"
                />
            </div>
            <RecommendedBooks />
            <Footer />
        </>
        )
}

export default BookDetail;