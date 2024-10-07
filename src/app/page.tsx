'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { Footer } from './components/footer';
import { PageRender } from './components/pageRender';
import { Subheader } from './components/subheader';


const Home = () => {
    return (
        <>
            <Header />
            <Subheader />
            <Background />
            <PageRender />
            <Footer />
        </>
    );
}

export default Home;