'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { PageRender } from '@/app/components/pageRender';
import { Footer } from './components/footer';


const Home = () => {
    return (
        <>
            <Background />
            <Header />
            <PageRender />
            <Footer />
        </>
    );
}

export default Home;