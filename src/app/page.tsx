'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { Page } from '@/app/components/pagination';
import { Footer } from './components/footer';


const Home = () => {
    return (
        <>
            <Background />
            <Header />
            <Page />
            <Footer />
        </>
    );
}

export default Home;