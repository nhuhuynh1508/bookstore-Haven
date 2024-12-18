// app/api/book/[id]/route.ts

import { NextResponse } from 'next/server';

interface Book {
    id: number;
    ISBN: string;
    title: string;
    coverImage: string;
    author: string;
    publicationYear: number;
    genres: string[];
    price: number;
    description: string;
}

const books: Book[] = [
    {
        id: 1,
        ISBN: "9780743273565",
        title: "The Great Gatsby",
        coverImage: "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
        author: "F. Scott Fitzgerald",
        publicationYear: 1925,
        genres: ["Fiction", "Classic"],
        price: 250123,
        description: "A novel about the American dream and the disillusionment that comes with it."
    },
    {
        id: 2,
        ISBN: "9780061120084",
        title: "To Kill a Mockingbird",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn5xkKB1ByJI59VpGEBBkkFRN0_FJ9COkr2g&s",
        author: "Harper Lee",
        publicationYear: 1960,
        genres: ["Fiction", "Classic", "Historical"],
        price: 200984,
        description: "A gripping and heart-wrenching story about racism and innocence in the American South."
    },
    {
        id: 3,
        ISBN: "9780451524935",
        title: "1984",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFupPRCVHxbF6KK5_OJu8MBU7glDpWje51uw&s",
        author: "George Orwell",
        publicationYear: 1949,
        genres: ["Dystopian", "Science Fiction"],
        price: 220547,
        description: "A chilling vision of a totalitarian regime and the suppression of individual freedoms."
    },
    {
        id: 4,
        ISBN: "9780141439518",
        title: "Pride and Prejudice",
        coverImage: "https://readaloudrevival.com/wp-content/uploads/2016/05/Pride-and-Prejudice.png.webp",
        author: "Jane Austen",
        publicationYear: 1813,
        genres: ["Romance", "Classic"],
        price: 180325,
        description: "A witty exploration of love, class, and social expectations in Regency-era England."
    },
    {
        id: 5,
        ISBN: "9780142437241",
        title: "Moby-Dick",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqqPGnWsAW_RbpfxOSOszq-F0uMZauTm70A&s",
        author: "Herman Melville",
        publicationYear: 1851,
        genres: ["Adventure", "Classic"],
        price: 175457,
        description: "A thrilling narrative of obsession and revenge set on the high seas."
    },
    {
        id: 6,
        ISBN: "9780141547241",
        title: "War and Peace",
        coverImage: "https://cdn.kobo.com/book-images/3ac03eac-d437-47e3-9b15-52542edabd56/1200/1200/False/war-and-peace-34.jpg",
        author: "Leo Tolstoy",
        publicationYear: 1869,
        genres: ["Historical Fiction", "Classic"],
        price: 124579,
        description: "A sweeping epic of Russian society during the Napoleonic Wars."
    },
    {
        id: 7,
        ISBN: "4370141547241",
        title: "The Catcher in the Rye",
        coverImage: "https://i0.wp.com/www.printmag.com/wp-content/uploads/2010/02/2326a7_e6d8ea079e4344e791725f50fbb89a94mv2.jpg?resize=263%2C388&quality=89&ssl=1",
        author: "J.D. Salinger",
        publicationYear: 1951,
        genres: ["Fiction", "Classic"],
        price: 150123,
        description: "A story of adolescent alienation and rebellion against the norms of society."
    },
    {
        id: 8,
        ISBN: "4370141547241",
        title: "The Hobbit",
        coverImage: "https://tolkienlibrary.com/press/images/movie-tie-in-the-hobbit.jpg",
        author: "J.R.R. Tolkien",
        publicationYear: 1937,
        genres: ["Fantasy", "Adventure"],
        price: 100123,
        description: "A whimsical adventure about a hobbit's journey to reclaim a lost kingdom."
    },
    {
        id: 9,
        ISBN: "4370141547241",
        title: "Brave New World",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMMXBZClhy-ZM-Cfre7xisCD02IE3wihMRww&s",
        author: "Aldous Huxley",
        publicationYear: 1932,
        genres: ["Dystopian", "Science Fiction"],
        price: 110123,
        description: "A vision of a future society driven by technology, consumerism, and control."
    },
    {
        id: 10,
        ISBN: "4370141547241",
        title: "Crime and Punishment",
        coverImage: "https://bizweb.dktcdn.net/100/364/248/products/a193go2p8wl.jpg?v=1671837075017",
        author: "Fyodor Dostoevsky",
        publicationYear: 1866,
        genres: ["Philosophical Fiction", "Classic"],
        price: 130123,
        description: "A psychological exploration of guilt, morality, and redemption."
    },
    {
        id: 11,
        ISBN: "4370141547241",
        title: "The Odyssey",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVPTQl5OoSguJPcMBKNXFzpIpIR_dDP8K8kQ&s",
        author: "Homer",
        publicationYear: -800,
        genres: ["Epic", "Classic", "Mythology"],
        price: 140123,
        description: "An epic journey of the hero Odysseus as he returns home after the Trojan War."
    },
    {
        id: 12,
        ISBN: "4370141547241",
        title: "Wuthering Heights",
        coverImage: "https://d28hgpri8am2if.cloudfront.net/tagged_assets/cvr9781471141638/9781471141638_hr.jpg",
        author: "Emily Brontë",
        publicationYear: 1847,
        genres: ["Gothic", "Romance", "Classic"],
        price: 160123,
        description: "A dark and passionate tale of love, revenge, and obsession on the Yorkshire moors."
    },
    {
        id: 13,
        ISBN: "4370141547241",
        title: "Jane Eyre",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnMDSiSVvXCpqhAOGd-cwIK1MTXsVYAaJifA&s",
        author: "Charlotte Brontë",
        publicationYear: 1847,
        genres: ["Romance", "Gothic", "Classic"],
        price: 170123,
        description: "The story of a governess who overcomes adversity and finds love on her own terms."
    },
    {
        id: 14,
        ISBN: "43123141547241",
        title: "The Divine Comedy",
        coverImage: "https://images.penguinrandomhouse.com/cover/9780143107194",
        author: "Dante Alighieri",
        publicationYear: 1320,
        genres: ["Epic", "Classic", "Philosophy"],
        price: 190123,
        description: "A journey through Hell, Purgatory, and Heaven, exploring themes of sin, redemption, and divine justice."
    },
    {
        id: 15,
        ISBN: "4370141547241",
        title: "Anna Karenina",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0M7FZO2WCF5s7MIwEqwfg_3kbHlIbSrJlhw&s",
        author: "Leo Tolstoy",
        publicationYear: 1878,
        genres: ["Romance", "Drama", "Classic"],
        price: 210123,
        description: "A tragic love story set against the backdrop of Russian society in the 19th century."
    },
    {
        id: 16,
        ISBN: "4370141547241",
        title: "The Brothers Karamazov",
        coverImage: "https://images.penguinrandomhouse.com/cover/9780679410034",
        author: "Fyodor Dostoevsky",
        publicationYear: 1880,
        genres: ["Philosophical Fiction", "Classic"],
        price: 230123,
        description: "A philosophical novel about faith, free will, and morality, centering on a patricide."
    },
    {
        id: 17,
        ISBN: "4370141547276",
        title: "Frankenstein",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MT6IgkZdFow5qTUE59gQgqgEQScDa8Garg&s",
        author: "Mary Shelley",
        publicationYear: 1818,
        genres: ["Science Fiction", "Gothic", "Classic"],
        price: 242123,
        description: "A cautionary tale about the dangers of playing god and the creation of a monster."
    },
    {
        id: 18,
        ISBN: "4370141547241",
        title: "The Picture of Dorian Gray",
        coverImage: "https://images.penguinrandomhouse.com/cover/9780141442464",
        author: "Oscar Wilde",
        publicationYear: 1890,
        genres: ["Gothic", "Philosophical Fiction", "Classic"],
        price: 260123,
        description: "A tale about the dangers of vanity, corruption, and the quest for eternal youth."
    },
    {
        id: 19,
        ISBN: "4370281547241",
        title: "The Iliad",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxZMtKMHqmmSBM_GL7Y6vU10NMWCtH_zbpg&s",
        author: "Homer",
        publicationYear: -750,
        genres: ["Epic", "Classic", "Mythology"],
        price: 280123,
        description: "An ancient Greek epic about the Trojan War and the wrath of Achilles."
    },
    {
        id: 20,
        ISBN: "4370149997241",
        title: "One Hundred Years of Solitude",
        coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg",
        author: "Gabriel García Márquez",
        publicationYear: 1967,
        genres: ["Magical Realism", "Fiction"],
        price: 270123,
        description: "A sprawling, magical realist tale of the Buendía family's rise and fall over generations."
    },
    {
        id: 21,
        ISBN: "1580141547241",
        title: "Don Quixote",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlQBTSorB_uLxg8IP4pSJI29LVw2839mCAqw&s",
        author: "Miguel de Cervantes",
        publicationYear: 1605,
        genres: ["Satire", "Adventure", "Classic"],
        price: 290123,
        description: "A comedic tale of a man who becomes a knight-errant, tilting at windmills in his quest for chivalry."
    },
    {
        id: 22,
        ISBN: "4370789547241",
        title: "Madame Bovary",
        coverImage: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9781416523741_9781416523741_hr.jpg",
        author: "Gustave Flaubert",
        publicationYear: 1857,
        genres: ["Realism", "Classic"],
        price: 300123,
        description: "A story about the dissatisfaction and downfall of a provincial housewife seeking excitement beyond her means."
    },
    {
        id: 23,
        ISBN: "437014138741",
        title: "The Count of Monte Cristo",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZwjztfYIxyo7treg_27t58d6lxKesWJXReg&s",
        author: "Alexandre Dumas",
        publicationYear: 1844,
        genres: ["Adventure", "Historical Fiction", "Classic"],
        price: 320123,
        description: "A gripping tale of betrayal, revenge, and redemption, set in post-Napoleonic France."
    },
    {
        id: 24,
        ISBN: "4370141547241",
        title: "The Metamorphosis",
        coverImage: "https://i.etsystatic.com/11749085/r/il/c355f3/918229536/il_570xN.918229536_l0sk.jpg",
        author: "Franz Kafka",
        publicationYear: 1915,
        genres: ["Absurdist Fiction", "Classic"],
        price: 340123,
        description: "A surreal and disturbing story of a man who wakes up one morning transformed into a giant insect."
    },
    {
        id: 25,
        ISBN: "4370141547100",
        title: "The Stranger",
        coverImage: "https://m.media-amazon.com/images/I/617WkdpG8xL._AC_UF1000,1000_QL80_.jpg",
        author: "Albert Camus",
        publicationYear: 1942,
        genres: ["Existential Fiction", "Philosophical Fiction"],
        price: 330123,
        description: "A novel that explores existentialism and absurdity through the eyes of a man detached from society."
    },
    {
        id: 26,
        ISBN: "4370238547241",
        title: "Normal People",
        coverImage: "https://m.media-amazon.com/images/I/71bi5ga7Y-L._AC_UF894,1000_QL80_.jpg",
        author: "Sally Rooney",
        publicationYear: 2018,
        genres: ["Contemporary Fiction", "Romance"],
        price: 310123,
        description: "A complex love story about two young people navigating their relationship through high school and university in Ireland."
    },
    {
        id: 27,
        ISBN: "1230141547241",
        title: "Daisy Jones & The Six",
        coverImage: "https://bizweb.dktcdn.net/100/378/470/products/daisy-jones-and-the-six-the-sunday-times-bestseller-paperback-9-jan-2020-uk.jpg?v=1660800629063",
        author: "Taylor Jenkins Reid",
        publicationYear: 2019,
        genres: ["Historical Fiction", "Music"],
        price: 350123,
        description: "An oral history of a fictional rock band in the 1970s, exploring the complexities of fame, love, and heartbreak."
    },
    {
        id: 28,
        ISBN: "4370141543241",
        title: "The Giver of Stars",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTEOLehtb0zO_FkynwkOxq9yIsHdRnz7CvQQ&s",
        author: "Jojo Moyes",
        publicationYear: 2019,
        genres: ["Historical Fiction", "Romance"],
        price: 360123,
        description: "A story of female friendship and empowerment set against the backdrop of the Pack Horse Library Project in Depression-era Kentucky."
    },
    {
        id: 29,
        ISBN: "4370141547444",
        title: "The Midnight Library",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-XewEIDM-yCiLLSynORoahhkJwn0CiHT7qg&s",
        author: "Matt Haig",
        publicationYear: 2020,
        genres: ["Fantasy", "Contemporary Fiction"],
        price: 370123,
        description: "A magical library offers a woman the chance to explore different versions of her life, leading to profound realizations."
    },
    {
        id: 30,
        ISBN: "85670141547241",
        title: "The Road",
        coverImage: "https://m.media-amazon.com/images/I/91bwHfPx-SL._AC_UF894,1000_QL80_.jpg",
        author: "Cormac McCarthy",
        publicationYear: 2006,
        genres: ["Post-Apocalyptic Fiction", "Literary Fiction"],
        price: 380123,
        description: "A haunting tale of a father and son journeying through a desolate America in a world devastated by an unspecified disaster."
    },
    {
        id: 31,
        ISBN: "43321141547241",
        title: "The Shadow of the Wind",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6iMJAQfDOEbd3yOC2v1eF_0TG9FAZntimA&s",
        author: "Carlos Ruiz Zafón",
        publicationYear: 2001,
        genres: ["Historical Fiction", "Mystery"],
        price: 390123,
        description: "A young boy's discovery of a forgotten book leads him into a labyrinth of intrigue in post-war Barcelona."
    },
    {
        id: 32,
        ISBN: "4370143247241",
        title: "Never Let Me Go",
        coverImage: "https://m.media-amazon.com/images/I/71K0eikl7wL._AC_UF1000,1000_QL80_.jpg",
        author: "Kazuo Ishiguro",
        publicationYear: 2005,
        genres: ["Science Fiction", "Dystopian Fiction"],
        price: 400123,
        description: "A story about students at a mysterious boarding school who confront the reality of their existence as clones."
    },
    {
        id: 33,
        ISBN: "43701415465411",
        title: "The Night Circus",
        coverImage: "https://erinmorgenstern.com/wp-content/uploads/2011/03/Night-Circus-Cover-low-res.jpg",
        author: "Erin Morgenstern",
        publicationYear: 2011,
        genres: ["Fantasy", "Historical Fiction"],
        price: 410123,
        description: "A magical competition between two young illusionists takes place within an enchanting circus that only opens at night."
    },
    {
        id: 34,
        ISBN: "4370141547241",
        title: "Life of Pi",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBzX1mWlsRW1tFWD2tREjstavvZXbqhrEqA&s",
        author: "Yann Martel",
        publicationYear: 2001,
        genres: ["Adventure Fiction", "Philosophical Fiction"],
        price: 420123,
        description: "A young boy survives a shipwreck and shares a lifeboat with a Bengal tiger, leading to a profound journey of faith and survival."
    },
    {
        id: 35,
        ISBN: "41231141547241",
        title: "The Goldfinch",
        coverImage: "https://m.media-amazon.com/images/I/51kCei+c72L._AC_UF1000,1000_QL80_.jpg",
        author: "Donna Tartt",
        publicationYear: 2013,
        genres: ["Literary Fiction", "Coming-of-Age Fiction"],
        price: 430123,
        description: "A young boy's life is turned upside down after surviving a terrorist attack at an art museum, leading him into a world of art and crime."
    },
    {
        id: 36,
        ISBN: "41231312447241",
        title: "Station Eleven",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTHuuyE5TSvdfUlpzl9no9f5wMF2bYpxulqA&s",
        author: "Emily St. John Mandel",
        publicationYear: 2014,
        genres: ["Post-Apocalyptic Fiction", "Literary Fiction"],
        price: 431223,
        description: "A pandemic wipes out most of humanity, and a traveling theater troupe seeks to keep the memory of civilization alive."
    },
    {
        id: 37,
        ISBN: "21380943241131",
        title: "The Secret History",
        coverImage: "https://bizweb.dktcdn.net/thumb/grande/100/326/228/products/the-secret-history-by-donna-tartt-bookworm-hanoi-e3c168e9-389c-48bb-9e1c-5060289edfd0.jpg?v=1562497112007",
        author: "Donna Tartt",
        publicationYear: 1992,
        genres: ["Literary Fiction", "Mystery"],
        price: 432123,
        description: "A tale of a group of college students studying ancient Greek who become involved in a murder plot."
    },
    {
        id: 38,
        ISBN: "21380943241131",
        title: "Where the Crawdads Sing",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVLNJTsztQ-rTuQvA-biJBFugAdoP-kNnCA&s",
        author: "Delia Owens",
        publicationYear: 2018,
        genres: ["Literary Fiction", "Mystery"],
        price: 132108,
        description: "A coming-of-age story about a young girl who raises herself in the marshes of North Carolina and becomes a suspect in a murder case."
    },
    {
        id: 39,
        ISBN: "2131321943241131",
        title: "The Invisible Life of Addie LaRue",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbPpE1RpY1A9T28EI6aMRZXh0DQJ2mRAbRUA&s",
        author: "V.E. Schwab",
        publicationYear: 2020,
        genres: ["Fantasy", "Historical Fiction"],
        price: 138549,
        description: "A young woman makes a Faustian bargain to live forever but is cursed to be forgotten by everyone she meets."
    },
    {
        id: 40,
        ISBN: "3124872395734931",
        title: "The Alchemist",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4T0aNvgYdBX8kfK_qYc046QFsSXhHE2NXWw&s",
        author: "Paulo Coelho",
        publicationYear: 1988,
        genres: ["Adventure", "Philosophical Fiction"],
        price: 213985,
        description: "A shepherd boy embarks on a journey to discover his personal legend and the true meaning of life."
    },
    {
        id: 41,
        ISBN: "213843243241131",
        title: "The Brothers Karamazov",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-htT8-h7neohcAsvkrbPqdbo9uPXphf0MoA&s",
        author: "Fyodor Dostoevsky",
        publicationYear: 1880,
        genres: ["Classic", "Philosophical Fiction"],
        price: 213935,
        description: "A profound exploration of morality, faith, and family dynamics through the lives of the Karamazov brothers."
    },
    {
        id: 42,
        ISBN: "21380944321131",
        title: "The Color Purple",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/ColorPurple.jpg/220px-ColorPurple.jpg",
        author: "Alice Walker",
        publicationYear: 1982,
        genres: ["Historical Fiction", "Epistolary Novel"],
        price: 211235,
        description: "A powerful narrative about the struggles of African American women in the early 20th century, told through letters."
    },
    {
        id: 43,
        ISBN: "213801323241131",
        title: "Slaughterhouse-Five",
        coverImage: "https://s26162.pcdn.co/wp-content/uploads/2019/03/110268.jpg",
        author: "Kurt Vonnegut",
        publicationYear: 1969,
        genres: ["Science Fiction", "Anti-War"],
        price: 210235,
        description: "A satirical novel about the experiences of a soldier who becomes 'unstuck in time' during and after World War II."
    },
    {
        id: 44,
        ISBN: "212750943241131",
        title: "A Fine Balance",
        coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1551173390i/5211.jpg",
        author: "Rohinton Mistry",
        publicationYear: 1995,
        genres: ["Historical Fiction", "Social Drama"],
        price: 213215,
        description: "Set in India during the Emergency, it tells the story of four characters whose lives become intertwined amidst social upheaval."
    },
    {
        id: 45,
        ISBN: "21380947681131",
        title: "The Nightingale",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSLudgHcSTDJYZl2h-IxoOgYrtBhaAM_9LTw&s",
        author: "Kristin Hannah",
        publicationYear: 2015,
        genres: ["Historical Fiction", "War Fiction"],
        price: 213100,
        description: "The story of two sisters in France during World War II and their struggles for survival and resistance against the Nazi occupation."
    },
    {
        id: 46,
        ISBN: "21380912841131",
        title: "The Book Thief",
        coverImage: "https://cdn.penguin.co.uk/dam-assets/books/9781784162122/9781784162122-jacket-large.jpg",
        author: "Markus Zusak",
        publicationYear: 2005,
        genres: ["Historical Fiction", "Young Adult"],
        price: 211200,
        description: "Narrated by Death, this novel tells the story of a young girl living in Nazi Germany who finds solace in stealing books."
    },
    {
        id: 47,
        ISBN: "21380321341131",
        title: "The Help",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkn7Jnb-1YqkGrr16trGJ_W0ozfVCShy578g&s",
        author: "Kathryn Stockett",
        publicationYear: 2009,
        genres: ["Historical Fiction", "Social Issues"],
        price: 223678,
        description: "Set in the 1960s, it follows the lives of African American maids working in white households and their quest for dignity."
    },
    {
        id: 48,
        ISBN: "213809432234431",
        title: "Circe",
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARvvBuY3z8jLJSmxZTWAfVInSYDB2RZqL-w&s",
        author: "Madeline Miller",
        publicationYear: 2018,
        genres: ["Fantasy", "Mythology"],
        price: 223456,
        description: "A retelling of the life of Circe, the enchantress from Homer's Odyssey, exploring themes of identity and empowerment."
    },
    {
        id: 49,
        ISBN: "213809123234431",
        title: "Anxious People",
        coverImage: "https://m.media-amazon.com/images/I/810XLL7gvRL._UF1000,1000_QL80_.jpg",
        author: "Fredrik Backman",
        publicationYear: 2020,
        genres: ["Contemporary Fiction", "Humor"],
        price: 223455,
        description: "A poignant comedy about a failed bank robbery and the lives of the hostages who are forced to confront their anxieties."
    },
    {
        id: 50,
        ISBN: "213809432231281",
        title: "Pachinko",
        coverImage: "https://bizweb.dktcdn.net/thumb/grande/100/364/248/products/9781455563920.jpg?v=1623227469370",
        author: "Min Jin Lee",
        publicationYear: 2017,
        genres: ["Historical Fiction", "Family Saga"],
        price: 212454,
        description: "A multigenerational saga about a Korean family living in Japan and the struggles they face against prejudice and hardship."
    },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    // Find the book with the matching ID
    const book = books.find(book => book.id === parseInt(id));

    if (book) {
        return NextResponse.json(book);
    } else {
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
}
