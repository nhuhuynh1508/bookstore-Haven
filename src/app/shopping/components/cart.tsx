'use client';

import { BookType } from "@/app/home/page";
import { clearCart, removeFromCart, updateQuantity } from "@/lib/features/bookSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";

export const Cart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.book.cartItems);
    const cartTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleRemoveFromCart = (book: BookType) => {
        dispatch(removeFromCart(book));
    };

    const handleQuantityChange = (book: BookType, quantity: string) => {
        dispatch(updateQuantity({ book, quantity }));
    };

    return (
        <>
            <div className="container p-4">
                <table className="min-w-full p-0 bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full text-left bg-gray-100 border-b border-gray-200">
                            <th className="p-3">Thumbnail</th>
                            <th className="p-4">Product Title</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-7">Total</th>
                            <th className="p-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="p-3">
                                    <img
                                        src={item.cover_image}
                                        alt={item.title}
                                        className="w-24 h-32 object-cover"
                                    />
                                </td>
                                <td className="p-4">
                                    <h1 className="text-lg font-bold">{item.title}</h1>
                                </td>
                                <td className="p-4">
                                    <span>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </td>
                                <td className="p-4">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        className="border p-2 text-center w-12"
                                        readOnly={false}
                                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                                    />
                                </td>
                                <td className="p-4">
                                    <span>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </td>
                                <td className="p-4">
                                    <button
                                        className="text-red-500 hover:text-red-600 text-2xl font-bold font-sans"
                                        onClick={() => handleRemoveFromCart(item)}
                                    >
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {cartItems.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="text-black px-4 py-2 border-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                            onClick={handleClearCart}
                        >
                            Clear Cart
                        </button>
                        <div className="text-lg font-bold border-2 p-4">Total: {cartTotalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                    </div>
                )}
            </div>
            {cartItems.length === 0 && (
                <div className="flex flex-col items-center justify-center space-y-4 p-12">
                    <span className="text-4xl font-serif text-center">
                        Your cart seems to be empty for now. Let's fix that!
                    </span>
                    <Link href="/home">
                        <div className="text-2xl font-serif text-gray-600 hover:underline flex items-center p-4">
                            <div className="relative flex items-center">
                                <div className="h-0 w-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-[16px] border-black"></div>
                                <span className="ml-2">Return to Shop</span>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};
