'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { Footer } from './components/footer';
import { PageRender } from './components/pageRender';


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