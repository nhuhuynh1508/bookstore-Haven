import { createSlice } from '@reduxjs/toolkit';

export interface BookState {
    cartItems: any[];
    wishListItems: any[];
    cartTotalAmount: number;
    wishListTotalAmount: number;
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
                (book) => book.ISBN === action.payload.ISBN);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity += 1;
            }
            else {
                const tempBook = {...action.payload, quantity: 1};
                state.cartItems.push(tempBook);
            }
            state.cartTotalAmount += state.cartItems.reduce(
                (total, item) => total + item.quantity * item.Price, 0);
        },

        removeFromCart(state, action) {
            const bookIndex = state.cartItems.findIndex(
                (book) => book.ISBN === action.payload.ISBN);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity -= 1;
                if (state.cartItems[bookIndex].quantity === 0) {
                    state.cartItems.splice(bookIndex, 1);
                }
            }
            state.cartTotalAmount -= state.cartItems.reduce(
                (total, item) => total + item.quantity * item.Price, 0);
        },

        clearCart(state) {
            state.cartItems = [];
        },

        updateQuantity(state, action) {
            const bookIndex = state.cartItems.findIndex(
                (book) => book.ISBN === action.payload.ISBN);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity = action.payload.quantity;
            }
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total + item.quantity * item.Price, 0);
        },

        addToWishList(state, action) {
            const bookIndex = state.wishListItems.findIndex(
                (book) => book.ISBN === action.payload.ISBN);
            // if the book isn;'t added to the wishlist
            if (bookIndex === -1) {
                state.wishListItems.push(action.payload);
            }
            state.wishListItems = [...state.wishListItems];
        }
    }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, addToWishList } = bookSlice.actions;

export default bookSlice.reducer;
