'use client';

// import type
import { BookType } from '@/app/type';
// import reducers
import { addToCart } from '@/lib/features/cartSlice';
// import hooks
import { useAppDispatch } from '@/lib/hooks';
// import components
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';

// in case of having a lot of different types
interface BookItemProps {
    book: BookType,
}

export const HorizontalDisplay = (props: BookItemProps) => {
    const { book } = props;
    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    // add to cart
    const handleAddToCart = () => {
        if (session) {
            dispatch(addToCart(book));
        } else {
            alert('You can add to cart after signing in!')
        }
    };

    return (
    <div className="relative md:w-2/3 md:pl-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {book?.title}
        </h2>

        <p className="text-gray-600 text-base mb-1">
            <strong>ISBN:</strong> {book?.ISBN}
        </p>
        <p className="text-gray-600 text-base mb-1">
            <strong>Genres:</strong> {(book?.genres || []).join(', ')}
        </p>

        <p className="text-lg font-semibold text-gray-800 mt-4">
        by {book?.author}
        </p>

        <p className="text-gray-700 mt-4">
        {book?.description}
        </p>

        <p className="text-lg font-semibold text-gray-900 mt-6">
        <strong>Price:</strong> {(book?.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>

        <div className="absolute bottom-0 right-0">
            <Button
                sx={{ borderRadius: '50px'}}
                variant="contained"
                color="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                }}
                startIcon={<ShoppingCartIcon />}
            >
            Add
            </Button>
        </div>

    </div>
    )
}
