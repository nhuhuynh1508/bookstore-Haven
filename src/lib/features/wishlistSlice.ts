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
            // const existedWishItems = JSON.parse(localStorage.getItem('WishListItems')) || [];
            // const itemIndex = existedWishItems.findIndex((item: BookType) => item.id === action.payload.id);
            
            // if (itemIndex === -1) {
            //     existedWishItems.push({id: action.payload.id});
            // } else {
            //     existedWishItems.slice(itemIndex, 1)
            // }
            
            const bookIndex = state.wishListItems.findIndex((book) => book.id === action.payload.id);
            if (bookIndex === -1) {
                state.wishListItems.push(action.payload);
            } else {
                state.wishListItems.slice(bookIndex, 1)
            }

            // localStorage.setItem('WishListItems', JSON.stringify(existedWishItems));
        },
    }
});

export const { addToWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
