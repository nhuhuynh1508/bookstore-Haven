'use client';
// import components
import { Background } from '@/app/components/background';
import { Header } from '@/app/components/header';
import { Footer } from './components/footer';
import { PageRender } from './components/pageRender';
import { Subheader } from './components/subheader';


const Home = () => {
    return (
        <div className="bg-blue-50">
            <Header />
            <Subheader />
            <Background />
            <PageRender />
            <Footer />
        </div>
    );
}

export default Home;