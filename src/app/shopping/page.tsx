'use client';
import { Header } from '../components/header';
// import components
import { Subheader } from '../components/subheader';
import { Cart } from './components/cart';
import { CartBackground } from './components/cartBackground';


function ShoppingCart() {
    return (
        <>
            <Header />
            <Subheader />
            <CartBackground />
            <Cart />
        </>
    );
}

export default ShoppingCart;