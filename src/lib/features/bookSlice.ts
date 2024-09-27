import { BookType } from '@/app/type';
import { createSlice } from '@reduxjs/toolkit';

interface CartItem extends BookType {
    quantity: number;
}

interface WishListItem extends BookType{
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
        addToCart(_state, action) {
            const existedItems = JSON.parse(localStorage.getItem('CartItems')) || [];
            const itemIndex = existedItems.findIndex((item: BookType) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                existedItems[itemIndex].quantity += 1;
                //alert(`${action.payload.title} has been added already!`)
            } else {
                existedItems.push({ id: action.payload.id, quantity: 1 });
                alert(`${action.payload.title} has been added!`)
            }

            localStorage.setItem('CartItems', JSON.stringify(existedItems));
        },

        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter((book) => book.id !== action.payload.id);
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

export const { addToCart, removeFromCart, clearCart, updateQuantity, addToWishList, removeFromWishList } = bookSlice.actions;

export default bookSlice.reducer;
