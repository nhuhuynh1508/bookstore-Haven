'use client';

// import type
import { BookType } from '@/app/type';
// import reducers
import { addToCart } from '@/lib/features/cartSlice';
// import hooks
import { useAppDispatch } from '@/lib/hooks';
// import components
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

// in case of having a lot of different types
interface BookItemProps {
    book: BookType,
}

export const HorizontalDisplay = (props: BookItemProps) => {
    const { book } = props;
    const dispatch = useAppDispatch();

    const storedISBN = JSON.parse(localStorage.getItem('ISBN')) || {};
    const ISBN = storedISBN[book?.id] || 0;
    const storedPrice = JSON.parse(localStorage.getItem('price')) || {};
    const price = storedPrice[book?.id] || 0;
    
    const [isLoading, setIsLoading] = useState(false)

    const handleAddToCart = () => {
        if (book) {
            setTimeout(() => {
                setIsLoading(false)
                dispatch(addToCart(book));
            }, 1000);
            setIsLoading(true)
        }
    };

    return (
    <div className="relative md:w-2/3 md:pl-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {book?.title}
        </h2>

        <p className="text-gray-600 text-base mb-1">
            <strong>ISBN:</strong> {ISBN}
        </p>
        <p className="text-gray-600 text-base mb-1">
            <strong>Genres:</strong> {(book?.genre || []).join(', ')}
        </p>

        <p className="text-lg font-semibold text-gray-800 mt-4">
        by {book?.author}
        </p>

        <p className="text-gray-700 mt-4">
        {book?.description}
        </p>

        <p className="text-lg font-semibold text-gray-900 mt-6">
        <strong>Price:</strong> {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>
        <div className="absolute bottom-0 right-0">
            <LoadingButton
                loading={isLoading}
                sx={{ borderRadius: '50px'}}
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                startIcon={<ShoppingCartIcon />}
            >
            Add
            </LoadingButton>
        </div>

    </div>
    )
}
