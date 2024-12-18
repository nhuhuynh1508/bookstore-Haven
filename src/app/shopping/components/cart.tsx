'use client';
// import type
import { BookType } from "@/app/type";
// import reducers
import { clearCart, removeFromCart, updateQuantity } from "@/lib/features/cartSlice";
// import hooks
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import components
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, IconButton } from "@mui/material";
import Link from "next/link";

export const Cart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleRemoveFromCart = (book: BookType) => {
        dispatch(removeFromCart(book));
    };

    const handleQuantityChange = (book: BookType, quantity: string) => {
        const parsedQuantity = parseInt(quantity);
        const validQuantity = (!isNaN(parsedQuantity) && parsedQuantity >= 1) ? parsedQuantity : 1;
        dispatch(updateQuantity({ id: book.id, quantity: validQuantity }));
    };

    return (
        <div className="container p-2 sm:p-4 w-full mx-auto">
            {/* Cart Section */}
                <div className="overflow-x-auto">
                    {cartItems.length > 0 ? (
                        <>
                            <p className="font-serif pb-2 text-lg"><strong>Total Quantity:</strong> {cartTotalQuantity}</p>
                            <table className="w-full table-fixed bg-white border border-gray-200">
                                {/* Table Headers */}
                                <thead>
                                    <tr className="w-full bg-gray-100 border-b border-gray-200">
                                        <th className="p-2 sm:p-3 text-xs sm:text-base text-left">Thumbnail</th>
                                        <th className="p-4 sm:p-3 text-xs sm:text-base text-left">Title</th>
                                        <th className="p-2 sm:p-3 text-xs sm:text-base text-left">Price</th>
                                        <th className="p-2 sm:p-3 text-xs sm:text-base text-left">Quantity</th>
                                        <th className="p-2 sm:p-3 text-xs sm:text-base text-left">Total</th>
                                        <th className="p-2 sm:p-3"></th>
                                    </tr>
                                </thead>
                                {/* Table Body */}
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <Link key={item.id} href={`/book/${item.id}`}>
                                                <td className="relative p-2 sm:p-3 text-center">
                                                    <img src={item.coverImage} alt={item.title} className="w-24" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                        <IconButton
                                                            sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'gray.200' }, boxShadow: 2 }}
                                                            aria-label="view"
                                                        >
                                                            <VisibilityIcon style={{ color: 'gray' }} />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </Link>
                                            <td className="p-4 sm:p-3 text-[10px] sm:text-base">
                                                <h1 className="font-bold">{item.title}</h1>
                                            </td>
                                            <td className="p-2 sm:p-3 text-[10px] sm:text-base">
                                                <span>{(item?.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </td>
                                            <td className="p-2 sm:p-3 text-[10px] sm:text-base">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="border text-center w-10 mx-auto"
                                                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                                                />
                                            </td>
                                            <td className="p-2 sm:p-3 text-[10px] sm:text-base">
                                                <span>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </td>
                                            <td className="p-2 sm:p-3 text-[10px] sm:text-base text-center">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleRemoveFromCart(item)}
                                                    sx={{
                                                        fontSize: '14px',
                                                        padding: '5px 5px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-3">
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="medium"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleClearCart}
                                    sx={{
                                        fontSize: '14px',
                                        padding: '5px 8px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Clear All
                                </Button>
                                <div className="text-lg font-bold border-2 p-3">
                                    Total: {cartTotalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </div>
                                
                            </div>
                            <div className="flex justify-end pt-2">
                                    <Link href="/shopping/checkout">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{fontWeight: 'bold'}}
                                    >
                                        Proceed to Payment
                                    </Button>
                                    </Link>
                                </div>
                        </>
                    ) : (
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
                </div>
            </div>
    );
};
