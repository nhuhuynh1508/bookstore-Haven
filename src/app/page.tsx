'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import Link from 'next/link';
import { Footer } from './components/footer';
import { NewArrivals } from './components/newArrivals';
import { Subheader } from './components/subheader';


const Home = () => {
    return (
        <div className="bg-blue-50">
            <Header />
            <Subheader />
            <Background />
            <NewArrivals />
            <Link href='/shopping'>
                <img
                    src="/assets/banner.jpg"
                    alt="Banner"
                    className="w-fit h-auto mt-5 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                />
            </Link>
            <Footer />
        </div>
    );
}

export default Home;