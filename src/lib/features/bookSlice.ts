import { BookType } from '@/app/type';
import { createSlice } from '@reduxjs/toolkit';

interface CartItem extends BookType {
    quantity: number;
}

interface WishListItem {
    quantity: number;
    id: number;
}

export interface BookState {
    cartItems: CartItem[];
    wishListItems: WishListItem[];
    wishListTotalAmount: number;
}

const initialState: BookState = {
    cartItems: [],
    wishListItems: [],
    wishListTotalAmount: 0,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addToCart(state, action) {
            const bookIndex = state.cartItems.findIndex(
                (book) => book.id === action.payload.id);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity
                state.cartItems[bookIndex].quantity += 1;
            }
            else {
                const tempBook = {...action.payload, quantity: 1};
                state.cartItems.push(tempBook);
            }
        },

        removeFromCart(state, action) {
            console.log('Payload in removeFromCart:', action.payload);
            const bookIndex = state.cartItems.findIndex(
                (book) => book.id === action.payload.id);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity -= 1;
                if (state.cartItems[bookIndex].quantity === 0) {
                    state.cartItems.splice(bookIndex, 1);
                }
            }
        },

        clearCart(state) {
            state.cartItems = [];
        },

        updateQuantity(state, action) {
            const bookIndex = state.cartItems.findIndex(
                (book) => book.id === action.payload.id);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity = action.payload.quantity;
            }
        },

        addToWishList(state, action) {
            const bookIndex = state.wishListItems.findIndex(
                (book) => book.id === action.payload.id);
            // if the book isn't added to the wishlist
            if (bookIndex === -1) {
                state.wishListItems.push(action.payload);
            }
            state.wishListItems = [...state.wishListItems];
        },

        removeFromWishList(state, action) {
            const bookIndex = state.wishListItems.findIndex(
                (book) => book.id === action.payload
            );
            if (bookIndex >= 0) {
                state.wishListItems.splice(bookIndex, 1);
            }
        },
    }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, addToWishList } = bookSlice.actions;

export default bookSlice.reducer;
