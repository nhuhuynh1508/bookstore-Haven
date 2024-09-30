'use client';
// import type
import { BookType } from "@/app/type";
// import reducers
import { clearCart, removeFromCart, updateQuantity } from "@/lib/features/cartSlice";
// import hooks
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import components
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Link from "next/link";

export const Cart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.book.cart.cartItems);
    const cartTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleRemoveFromCart = (book: BookType) => {
        dispatch(removeFromCart(book));
    };

    const handleQuantityChange = (book: BookType, quantity: string) => {
        dispatch(updateQuantity({ id: book.id, quantity: parseInt(quantity) }));
    };

    return (
        <>
            <div className="container p-2 sm:p-4 w-full mx-auto">
                <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full text-left bg-gray-100 border-b border-gray-200">
                            <th className="p-2 sm:p-3 text-xs sm:text-base">Thumbnail</th>
                            <th className="p-2 sm:p-3 text-xs sm:text-base">Product Title</th>
                            <th className="p-2 sm:p-3 text-xs sm:text-base">Price</th>
                            <th className="p-2 sm:p-3 text-xs sm:text-base">Quantity</th>
                            <th className="p-2 sm:p-3 text-xs sm:text-base">Total</th>
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
                                        className="sm:w-24 sm:h-32 xs:w-14 xs:h-20"
                                    />
                                </td>
                                <td className="p-1 sm:p-3 text-[10px] sm:text-base">
                                    <h1 className="font-bold">{item.title}</h1>
                                </td>
                                <td className="p-1 sm:p-3 text-[10px] sm:text-base">
                                    <span>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </td>
                                <td className="p-1 sm:p-3 xs:text-[10px] sm:text-base">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        className="border text-center w-16"
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                                    />
                                </td>
                                <td className="p-1 sm:p-3 text-[10px] sm:text-base">
                                    <span>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </td>
                                <td className="p-1 sm:p-3 text-[10px] sm:text-base">
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
                </div>
                {cartItems.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                        {/* <button
                            className="text-black mb-2 px-4 py-2 border-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                            onClick={handleClearCart}
                        >
                            Clear Cart
                        </button> */}
                        <Button
                            variant="contained"
                            color="error"
                            size="medium"
                            onClick={handleClearCart}
                            startIcon={<DeleteIcon />}
                            sx={{
                                fontSize: '18px',
                                padding: '5px 8px',
                            }}
                        >
                        Clear All
                        </Button>
                        <div className="text-base sm:text-lg font-bold border-2 mt-4 p-2 sm:p-4">Total: {cartTotalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                    </div>
                )}
            </div>
            {cartItems.length === 0 && (
                <div className="flex flex-col items-center justify-center space-y-4 p-12">
                    <span className="text-4xl font-serif text-center">
                        Your cart seems to be empty for now. Let's fix that!
                    </span>
                    <Link href="/">
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
