import { BookType } from '@/app/type';
import { createSlice } from '@reduxjs/toolkit';

interface CartItem extends BookType {
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            // const existedItems = JSON.parse(localStorage.getItem('CartItems')) || [];
            // const itemIndex = existedItems.findIndex((item: BookType) => item.id === action.payload.id);

            // if (itemIndex >= 0) {
            //     existedItems[itemIndex].quantity += 1;
            // } else {
            //     existedItems.push({ id: action.payload.id, quantity: 1 });
            //     alert(`${action.payload.title} has been added!`)
            // }

            const bookIndex = state.cartItems.findIndex((book) => book.id === action.payload.id);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity += 1;
            }
            else {
                const tempBook = {...action.payload, quantity: 1};
                state.cartItems.push(tempBook);
            }

            // localStorage.setItem('CartItems', JSON.stringify(existedItems));
        },

        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter((book) => book.id !== action.payload.id);
        },

        clearCart(state) {
            state.cartItems = [];
        },

        updateQuantity(state, action) {
            const bookIndex = state.cartItems.findIndex((book) => book.id === action.payload.id);
            if (bookIndex >= 0) {
                state.cartItems[bookIndex].quantity = action.payload.quantity;
            }
        },
    }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
