'use client';
// import components
import { Subheader } from '../components/subheader';
import { Cart } from './components/cart';
import { CartBackground } from './components/cartBackground';
import { CartHeader } from './components/cartHeader';

function ShoppingCart() {
    

    return (
        <>
            <CartHeader />
            <Subheader />
            <CartBackground />
            <Cart />
        </>
    );
}

export default ShoppingCart;