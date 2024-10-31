'use client'

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Subheader } from "../components/subheader";
import CurrentTimeDisplay from '../components/timeDisplay';


export default function AboutUs() {
    return (
        <>
            <Header />
            <Subheader />
            <CurrentTimeDisplay />
            <div className="flex flex-col md:flex-row md:space-x-8 p-6 max-w-6xl mx-auto">
                <div className="w:2/3">
                    <img
                        src="/assets/bookstore_4.jpeg"
                        alt="about-us"
                        className="w-50 h-50 p-4"
                    />
                </div>
                <div className="w:1/3 p-2">
                    <p className="font-bold font-eb_garamond text-6xl pb-4 pt-4"> Nice to meet you, </p>
                    <p className="font-bold font-eb_garamond text-4xl pb-4"> We are Book Haven!</p>
                    <p className="font-lato pb-6 text-xl">We are an online English bookshop based in Ho Chi Minh City, Vietnam.</p>
                    <p className="font-lato pb-6 text-xl">We stock books across different genres, from fiction, non-fiction, to a variety of graphic novels, as well as photography and art-books.</p>
                    <p className="font-lato pb-6 text-xl">We are committed to providing you with a wide selection of books, at competitive prices, and with excellent customer service.</p>
                    <p className="font-lato pb-6 text-xl">We are constantly updating our inventory with new titles, so be sure to check back often!</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-24">
                <p className="font-eb_garamond font-bold text-4xl text-center">It is only with the heart that one can see rightly; what is essential is invisible to the eye.</p>
                <p className="text-center mt-4 font-montserrat text-xl">-Antoine de Saint-Exupéry</p>
                <p className="font-IBM font-semibold text-lg">from Le Petit Prince</p>
            </div>
            <Footer />
        </>
    )
}