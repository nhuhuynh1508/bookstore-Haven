import { createSlice } from '@reduxjs/toolkit';

export interface BookState {
    cartItems: CartItem[];
    wishListItems: WishListItem[];
    cartTotalAmount: number;
    wishListTotalAmount: number;
}

interface CartItem {
    id: string;
    title: string;
    author: string;
    publication_year: string;
    genre: string[];
    description: string;
    cover_image: string;
    ISBN: string;
    Publisher: string;
    Price: number;
    quantity: number;
}

interface WishListItem {
    id: number;
}

const initialState: BookState = {
    cartItems: [],
    wishListItems: [],
    cartTotalAmount: 0,
    wishListTotalAmount: 0,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addToCart(state, action) {
            const bookIndex = state.cartItems.findIndex(
                (book) => book.id === action.payload.id
            );
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity += 1;
            } else {
                const tempBook = { ...action.payload, quantity: 1 };
                state.cartItems.push(tempBook);
            }
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total + item.quantity * item.Price, 0
            );
        },

        removeFromCart(state, action) {
            console.log('Payload received in removeFromCart:', action.payload);
            const bookIndex = state.cartItems.findIndex(
                
                (book) => book.id === action.payload.id
            );
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity -= 1;
                if (state.cartItems[bookIndex].quantity === 0) {
                    state.cartItems.splice(bookIndex, 1);
                }
            }
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total + item.quantity * item.Price, 0
            );
        },

        clearCart(state) {
            state.cartItems = [];
            state.cartTotalAmount = 0;
        },

        updateQuantity(state, action) {
            const bookIndex = state.cartItems.findIndex(
                (book) => book.id === action.payload.id
            );
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity = action.payload.quantity;
            }
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total + item.quantity * item.Price, 0
            );
        },

        addToWishList(state, action) {
            const bookIndex = state.wishListItems.findIndex(
                (book) => book.id === action.payload.id
            );
            if (bookIndex >= 0) {
                alert('Book already in wishlist');
            } else {
            let buildWishListItems = {...action.payload}
            state.wishListItems.push(buildWishListItems);
            }
        },

        removeFromWishList(state, action) {
            const bookIndex = state.wishListItems.findIndex(
                (book) => book.id === action.payload
            );
            if (bookIndex >= 0) {
                state.wishListItems.splice(bookIndex, 1);
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, addToWishList, removeFromWishList } = bookSlice.actions;

export default bookSlice.reducer;
