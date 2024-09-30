import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from './features/cartSlice';
import wishlistSlice from './features/wishlistSlice';

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    cart: cartSlice,
    wishlist: wishlistSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
        reducer: {
            book: persistedReducer,
        },
});

// Infer the type of makeStore
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const persistor = persistStore(store);