import { NextResponse } from 'next/server';

export async function GET() {
    const books = [
        {
            id: 1,
            title: "The Great Gatsby",
            coverImage: "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
            author: "F. Scott Fitzgerald",
            publicationYear: 1925,
            genres: ["Fiction", "Classic"],
            description: "A novel about the American dream and the disillusionment that comes with it."
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn5xkKB1ByJI59VpGEBBkkFRN0_FJ9COkr2g&s",
            author: "Harper Lee",
            publicationYear: 1960,
            genres: ["Fiction", "Classic", "Historical"],
            description: "A gripping and heart-wrenching story about racism and innocence in the American South."
        },
        {
            id: 3,
            title: "1984",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFupPRCVHxbF6KK5_OJu8MBU7glDpWje51uw&s",
            author: "George Orwell",
            publicationYear: 1949,
            genres: ["Dystopian", "Science Fiction"],
            description: "A chilling vision of a totalitarian regime and the suppression of individual freedoms."
        },
        {
            id: 4,
            title: "Pride and Prejudice",
            coverImage: "https://readaloudrevival.com/wp-content/uploads/2016/05/Pride-and-Prejudice.png.webp",
            author: "Jane Austen",
            publicationYear: 1813,
            genres: ["Romance", "Classic"],
            description: "A witty exploration of love, class, and social expectations in Regency-era England."
        },
        {
            id: 5,
            title: "Moby-Dick",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqqPGnWsAW_RbpfxOSOszq-F0uMZauTm70A&s",
            author: "Herman Melville",
            publicationYear: 1851,
            genres: ["Adventure", "Classic"],
            description: "A thrilling narrative of obsession and revenge set on the high seas."
        },
        {
            id: 6,
            title: "War and Peace",
            coverImage: "https://cdn.kobo.com/book-images/3ac03eac-d437-47e3-9b15-52542edabd56/1200/1200/False/war-and-peace-34.jpg",
            author: "Leo Tolstoy",
            publicationYear: 1869,
            genres: ["Historical Fiction", "Classic"],
            description: "A sweeping epic of Russian society during the Napoleonic Wars."
        },
        {
            id: 7,
            title: "The Catcher in the Rye",
            coverImage: "https://i0.wp.com/www.printmag.com/wp-content/uploads/2010/02/2326a7_e6d8ea079e4344e791725f50fbb89a94mv2.jpg?resize=263%2C388&quality=89&ssl=1",
            author: "J.D. Salinger",
            publicationYear: 1951,
            genres: ["Fiction", "Classic"],
            description: "A story of adolescent alienation and rebellion against the norms of society."
        },
        {
            id: 8,
            title: "The Hobbit",
            coverImage: "https://tolkienlibrary.com/press/images/movie-tie-in-the-hobbit.jpg",
            author: "J.R.R. Tolkien",
            publicationYear: 1937,
            genres: ["Fantasy", "Adventure"],
            description: "A whimsical adventure about a hobbit's journey to reclaim a lost kingdom."
        },
        {
            id: 9,
            title: "Brave New World",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMMXBZClhy-ZM-Cfre7xisCD02IE3wihMRww&s",
            author: "Aldous Huxley",
            publicationYear: 1932,
            genres: ["Dystopian", "Science Fiction"],
            description: "A vision of a future society driven by technology, consumerism, and control."
        },
        {
            id: 10,
            title: "Crime and Punishment",
            coverImage: "https://bizweb.dktcdn.net/100/364/248/products/a193go2p8wl.jpg?v=1671837075017",
            author: "Fyodor Dostoevsky",
            publicationYear: 1866,
            genres: ["Philosophical Fiction", "Classic"],
            description: "A psychological exploration of guilt, morality, and redemption."
        },
        {
            id: 11,
            title: "The Odyssey",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4bnewBCnGhvinvS4My2wvMrmbkZE_L0npQ&s",
            author: "Homer",
            publicationYear: -800,
            genres: ["Epic", "Classic", "Mythology"],
            description: "An epic journey of the hero Odysseus as he returns home after the Trojan War."
        },
        {
            id: 12,
            title: "Wuthering Heights",
            coverImage: "https://d28hgpri8am2if.cloudfront.net/tagged_assets/cvr9781471141638/9781471141638_hr.jpg",
            author: "Emily Brontë",
            publicationYear: 1847,
            genres: ["Gothic", "Romance", "Classic"],
            description: "A dark and passionate tale of love, revenge, and obsession on the Yorkshire moors."
        },
        {
            id: 13,
            title: "Jane Eyre",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnMDSiSVvXCpqhAOGd-cwIK1MTXsVYAaJifA&s",
            author: "Charlotte Brontë",
            publicationYear: 1847,
            genres: ["Romance", "Gothic", "Classic"],
            description: "The story of a governess who overcomes adversity and finds love on her own terms."
        },
        {
            id: 14,
            title: "The Divine Comedy",
            coverImage: "https://images.penguinrandomhouse.com/cover/9780143107194",
            author: "Dante Alighieri",
            publicationYear: 1320,
            genres: ["Epic", "Classic", "Philosophy"],
            description: "A journey through Hell, Purgatory, and Heaven, exploring themes of sin, redemption, and divine justice."
        },
        {
            id: 15,
            title: "Anna Karenina",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0M7FZO2WCF5s7MIwEqwfg_3kbHlIbSrJlhw&s",
            author: "Leo Tolstoy",
            publicationYear: 1878,
            genres: ["Romance", "Drama", "Classic"],
            description: "A tragic love story set against the backdrop of Russian society in the 19th century."
        },
        {
            id: 16,
            title: "The Brothers Karamazov",
            coverImage: "https://images.penguinrandomhouse.com/cover/9780679410034",
            author: "Fyodor Dostoevsky",
            publicationYear: 1880,
            genres: ["Philosophical Fiction", "Classic"],
            description: "A philosophical novel about faith, free will, and morality, centering on a patricide."
        },
        {
            id: 17,
            title: "Frankenstein",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MT6IgkZdFow5qTUE59gQgqgEQScDa8Garg&s",
            author: "Mary Shelley",
            publicationYear: 1818,
            genres: ["Science Fiction", "Gothic", "Classic"],
            description: "A cautionary tale about the dangers of playing god and the creation of a monster."
        },
        {
            id: 18,
            title: "The Picture of Dorian Gray",
            coverImage: "https://images.penguinrandomhouse.com/cover/9780141442464",
            author: "Oscar Wilde",
            publicationYear: 1890,
            genres: ["Gothic", "Philosophical Fiction", "Classic"],
            description: "A tale about the dangers of vanity, corruption, and the quest for eternal youth."
        },
        {
            id: 19,
            title: "The Iliad",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxZMtKMHqmmSBM_GL7Y6vU10NMWCtH_zbpg&s",
            author: "Homer",
            publicationYear: '750 BC',
            genres: ["Epic", "Classic", "Mythology"],
            description: "An ancient Greek epic about the Trojan War and the wrath of Achilles."
        },
        {
            id: 20,
            title: "One Hundred Years of Solitude",
            coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg",
            author: "Gabriel García Márquez",
            publicationYear: 1967,
            genres: ["Magical Realism", "Fiction"],
            description: "A sprawling, magical realist tale of the Buendía family's rise and fall over generations."
        },
        {
            id: 21,
            title: "Don Quixote",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlQBTSorB_uLxg8IP4pSJI29LVw2839mCAqw&s",
            author: "Miguel de Cervantes",
            publicationYear: 1605,
            genres: ["Satire", "Adventure", "Classic"],
            description: "A comedic tale of a man who becomes a knight-errant, tilting at windmills in his quest for chivalry."
        },
        {
            id: 22,
            title: "Madame Bovary",
            coverImage: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9781416523741_9781416523741_hr.jpg",
            author: "Gustave Flaubert",
            publicationYear: 1857,
            genres: ["Realism", "Classic"],
            description: "A story about the dissatisfaction and downfall of a provincial housewife seeking excitement beyond her means."
        },
        {
            id: 23,
            title: "The Count of Monte Cristo",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZwjztfYIxyo7treg_27t58d6lxKesWJXReg&s",
            author: "Alexandre Dumas",
            publicationYear: 1844,
            genres: ["Adventure", "Historical Fiction", "Classic"],
            description: "A gripping tale of betrayal, revenge, and redemption, set in post-Napoleonic France."
        },
        {
            id: 24,
            title: "The Metamorphosis",
            coverImage: "https://i.etsystatic.com/11749085/r/il/c355f3/918229536/il_570xN.918229536_l0sk.jpg",
            author: "Franz Kafka",
            publicationYear: 1915,
            genres: ["Absurdist Fiction", "Classic"],
            description: "A surreal and disturbing story of a man who wakes up one morning transformed into a giant insect."
        },
        {
            id: 25,
            title: "The Stranger",
            coverImage: "https://bizweb.dktcdn.net/thumb/1024x1024/100/431/180/products/stranger1.png?v=1637402268510",
            author: "Albert Camus",
            publicationYear: 1942,
            genres: ["Existential Fiction", "Philosophical Fiction"],
            description: "A novel that explores existentialism and absurdity through the eyes of a man detached from society."
        },
    ]
    return NextResponse.json(books);
}
