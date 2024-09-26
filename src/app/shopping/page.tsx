'use client';

// import hooks
import { useAppSelector } from '@/lib/hooks';

// import components
import { Cart } from './components/cart';
import { CartHeader } from './components/cartHeader';

function ShoppingCart() {
    const cartItems = useAppSelector((state) => state.book.cartItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <CartHeader />
            <div className="flex justify-between items-center p-2">
                <div className="flex items-center">
                    <span className="xs:text-3xl sm:text-5xl font-serif border-b-4 border-gray-300 pb-2 p-2">Cart</span>
                </div>
                <span className="font-serif text-black pt-6">Total Quantity: {cartTotalQuantity}</span>
            </div>
            <Cart />
        </>
    );
}

export default ShoppingCart;