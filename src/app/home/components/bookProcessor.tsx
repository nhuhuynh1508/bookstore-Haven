// import type
import { BookType } from "@/app/type";

// random price generator
const generateRandomPrice = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// random ISBN generator
const generateRandomISBN = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 100000) + min);
};

export const processedBook = (book: BookType) => {
    const storedPrice = JSON.parse(localStorage.getItem('price')) || {};
    const storedISBN = JSON.parse(localStorage.getItem('ISBN')) || {};
    // retrieve the price from local storage if it exists, if not generate a random price
    const randomPrice = storedPrice[book.id] || generateRandomPrice(100000, 500000);
    // retrieve the ISBN from local storage if exists, if not generate a random price
    const randomISBN = storedISBN[book.id] || generateRandomISBN(100000000000, 900000000000);

    if (!storedPrice[book.id]) {
        localStorage.setItem('price', JSON.stringify({ ...storedPrice, [book.id]: randomPrice }));
    }
    
    if (!storedISBN[book.id]) {
        localStorage.setItem('ISBN', JSON.stringify({ ...storedISBN, [book.id]: randomISBN }));
    }
    return {
        ...book,
        price: randomPrice,
        ISBN: randomISBN,
        };
}
