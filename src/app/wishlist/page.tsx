'use client'
// import slice
import { clearWishList, removeFromWishList } from "@/lib/features/wishlistSlice";
import { useDispatch } from "react-redux";
// import hook
import { useAppSelector } from "@/lib/hooks";
// import mui material
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
// import components
import Link from "next/link";
import { Background } from "../components/background";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Subheader } from "../components/subheader";
import { BookType } from "../type";

function Wishlist() {
    const wishListItems = useAppSelector((state) => state.wishlist.wishListItems);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (book: BookType) => {
        dispatch(removeFromWishList(book));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishList())
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Subheader />
            <Background />
            <div className="container mx-auto p-6 flex-grow">
                <div className="flex items-center pb-2">
                    <span className="xs:text-3xl sm:text-5xl font-eb_garamond font-bold border-gray-300 pb-2 pt-2">Wishlist</span>
                    <hr className="w-full my-2 border-t-2 border-gray-300" />
                </div>
                {wishListItems.map((book) => (
                    <div key={book.id} className="flex items-center border-b m-2 pb-6 mb-6">
                        <div className="w-1/6">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-24"
                            />
                        </div>
                        <div className="p-2">
                            <h2 className="text-lg font-bold">{book.title}</h2>
                            <p>by {book.author}</p>
                        </div>
                        <div className="ml-auto flex space-x-4">
                            <Link href={`/book/${book.id}`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        fontSize: { xs: '12px', sm: '14px' },
                                        padding: '5px 8px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    View Book
                                </Button>
                            </Link>

                            <IconButton
                                color="error"
                                onClick={() => handleRemoveFromWishlist(book)}
                                sx={{
                                    fontSize: '14px',
                                    padding: '5px 5px',
                                    fontWeight: 'bold',
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                ))}
                {wishListItems.length === 0 && (
                    <div className="flex flex-col items-start justify-start pt-3">
                        <span className="text-2xl font-serif text-left">
                            No books were added to the wishlist.
                        </span>
                    </div>
                )}
                {wishListItems.length > 0 && (
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={handleClearWishlist}
                        sx={{
                            fontSize: '14px',
                            padding: '5px 8px',
                            fontWeight: 'bold',
                            margin: '2px'
                        }}
                    >
                        Clear All
                    </Button>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Wishlist;
