import { BookType } from '@/app/type';
import { createSlice } from '@reduxjs/toolkit';

interface WishListItem extends BookType{
    quantity: number;
    id: number;
}

export interface WishListState {
    wishListItems: WishListItem[];
}

const initialState: WishListState = {
    wishListItems: [],
};


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishList(state, action) {
            const bookIndex = state.wishListItems.findIndex((book) => book.id === action.payload.id);
            if (bookIndex === -1) {
                state.wishListItems.push(action.payload);
            } else {
                state.wishListItems.splice(bookIndex, 1)
            }
        },

        removeFromWishList(state, action) {
            state.wishListItems = state.wishListItems.filter((book) => book.id !== action.payload.id);
        },

        clearWishList(state) {
            state.wishListItems = [];
        }
    }
});

export const { addToWishList, removeFromWishList, clearWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
