import { Background } from '@/app/home/components/background';
import { sampleBooks } from '@/app/home/components/bookData';
import { BookItem } from '@/app/home/components/bookItem';
import { Header } from '@/app/home/components/header';

function Home() {
    return (
        <>
            <Background />
            <Header />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {sampleBooks.map((book, index) => (
                    <BookItem
                        key={index}
                        book={book}
                    />
                ))}
                </div>
        </>
    );
}

export default Home;