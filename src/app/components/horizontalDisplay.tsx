'use client';

// import type
import { BookType } from '@/app/type';
// import reducers
import { addToCart } from '@/lib/features/cartSlice';
// import hooks
import { useAppDispatch } from '@/lib/hooks';
// import components
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';

// in case of having a lot of different types
interface BookItemProps {
    book: BookType,
    loading: boolean,
}

export const HorizontalDisplay = (props: BookItemProps) => {
    const { book, loading } = props;
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

    if (loading) {
        return (
            <div className="relative p-6 bg-white shadow-lg rounded-lg w-full md:pl-8 flex space-x-6">
                <Skeleton variant="rectangular" width={300} height={280} />

            <div className="flex-grow">
                <Skeleton variant="text" width="70%" height={40} />
                <Skeleton variant="text" width="30%" height={20} />
                <Skeleton variant="text" width="50%" height={20} />
                <Skeleton variant="text" width="40%" height={30} />
                <Skeleton variant="rectangular" width="100%" height={80} className="mt-4" />
                <Skeleton variant="text" width="20%" height={30} className="mt-6" />
                    <div className="mt-6">
                        <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: '50px' }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
    <>
    <div className="relative md:pl-8 sm:flex-row flex flex-col justify-center space-x-8 bg-white p-6">
    {/* Cover Image */}
        <div className="w-full sm:w-1/2 mt-5 flex justify-center">
            <img
                src={book?.coverImage}
                alt={book?.title}
                className="w-48 sm:w-72 h-auto object-cover rounded"
            />
        </div>

        {/* Book Information */}
        <div className="flex flex-col justify-center mr-12 xs:p-5">
            <h2 className="text-5xl font-eb_garamond font-bold text-gray-900 mb-4">
                {book?.title}
            </h2>

            <p className="text-gray-600 text-base mb-1">
                <strong>ISBN:</strong> {book?.ISBN}
            </p>

            <p className="text-gray-600 text-base mb-1">
                <strong>Genres:</strong> {(book?.genres || []).join(', ')}
            </p>

            <p className="text-2xl font-serif font-bold text-gray-800 mt-4">
                by {book?.author}
            </p>

            <p className="text-gray-700 mt-4">
                {book?.description}
            </p>

            <p className="text-lg font-semibold text-gray-900 mt-6">
                <strong>Price:</strong> {(book?.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>

            {/* Add to Cart Button */}
            <div className="mt-6">
                <Button
                    sx={{
                        borderRadius: '100px',
                        fontWeight: 'bold'
                    }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                    }}
                    startIcon={<ShoppingCartIcon />}
                >
                    Add To Cart
                </Button>
            </div>
        </div>
    </div>

    </>
    )
}
