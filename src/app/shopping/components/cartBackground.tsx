import { useAppSelector } from "@/lib/hooks";

export const CartBackground = () => {
    const cartItems = useAppSelector((state) => state.book.cart.cartItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
        <div className="mt-10">
            <img
                src='/assets/bookcart.jpg'
                alt="bookcart"
                className="w-full h-80 object-cover"
            />
        </div>
            <div className="flex justify-between items-center p-2">
                <span className="xs:text-3xl sm:text-5xl font-serif border-gray-300 pb-2 p-2">Cart</span>
                <span className="font-serif text-black pt-6 mr-2 text-xl">Total Quantity: {cartTotalQuantity}</span>
            </div>
        </>
    )
}
