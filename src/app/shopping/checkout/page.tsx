'use client'

import { Footer } from '@/app/components/footer';
import { Header } from '@/app/components/header';
import { Subheader } from '@/app/components/subheader';
import { useAppSelector } from '@/lib/hooks';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function Checkout() {
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const cartTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = 35000;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        country: 'Vietnam',
        createAccount: false,
        differentAddress: false,
        orderNotes: '',
        shippingMethod: 'standard',
        paymentMethod: 'bank_transfer',
        plasticFree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    return (
        <>
            <Header />
            <Subheader />
            <div className="flex items-center m-3">
                <span className="xs:text-3xl sm:text-5xl font-eb_garamond font-bold border-gray-300 pb-2 pt-2">Checkout</span>
                <hr className="w-full my-2 border-t-2 border-gray-300" />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 p-6 max-w-6xl mx-auto">
                {/* Billing Details Section */}
                <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Billing details</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="md:w-1/2">
                                <label className="block text-xl font-eb_garamond font-semibold">First Name*</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Please enter your first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="md:w-1/2">
                                <label className="block text-xl font-eb_garamond font-semibold">Last Name*</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Please enter your last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xl font-eb_garamond font-semibold">Phone*</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Please enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-eb_garamond font-semibold">Email address*</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Please enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-eb_garamond font-semibold">City*</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Please enter a city in Vietnam"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-eb_garamond font-semibold">Street address*</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Please enter your address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-eb_garamond font-semibold">Order notes (optional)</label>
                            <textarea
                                name="orderNotes"
                                placeholder="Notes about your order, e.g. special notes for delivery."
                                value={formData.orderNotes}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </form>
                </div>

                {/* Order Summary Section */}
                <div className="md:w-1/3 mt-8 md:mt-0">
                    <h2 className="text-2xl font-bold mb-4">Your order</h2>

                    <div className="bg-gray-50 p-4 rounded-md space-y-4">
                        {/* Order Items */}
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between border-b pb-2">
                                <span className="font-bold">{item.title} x {item.quantity}</span>
                                <span>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        ))}

                        {/* Subtotal and Shipping Options */}
                        <div className="flex justify-between border-b py-2">
                            <span className="font-bold">Subtotal</span>
                            <span>{cartTotalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>

                        <div className="flex flex-col space-y-2 py-2 border-b">
                            <span className="font-bold">Shipping (Please choose one of the options)</span>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="standard"
                                    checked={formData.shippingMethod === 'standard'}
                                    onChange={handleChange}
                                    className="h-4 w-4 border rounded-md"
                                />
                                <span>Standard Shipping: 35,000 ₫</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="pickup"
                                    checked={formData.shippingMethod === 'pickup'}
                                    onChange={handleChange}
                                    className="h-4 w-4 border rounded-md"
                                />
                                <span>Local pickup (available at our office after 12pm of next working day)</span>
                            </label>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>
                                {(cartTotalAmount + (formData.shippingMethod === 'standard' ? shippingFee : 0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-gray-50 mt-4 rounded-md space-y-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank_transfer"
                                    checked={formData.paymentMethod === 'bank_transfer'}
                                    onChange={handleChange}
                                    className="h-4 w-4 border rounded-md"
                                />
                                <span>Direct Bank Transfer</span>
                            </label>
                            <p className="text-sm text-gray-500 pl-6">
                                Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                            </p>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash_on_delivery"
                                    checked={formData.paymentMethod === 'cash_on_delivery'}
                                    onChange={handleChange}
                                    className="h-4 w-4 border rounded-md"
                                />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <div className="mt-4">
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            className="w-full p-2 rounded-md"
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
