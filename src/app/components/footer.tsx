// import MUI components
import { useState } from "react";
// import LoadingButton
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubscribeButton = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error state
        setSuccessMessage(''); // Reset success message

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Sending email in the body
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('You have successfully subscribed to the newsletter.'); // Set success message
                setEmail(''); // Reset email input
            } else {
                setError(data.message || 'Failed to subscribe, please try again later.');
            }
        } catch (error) {
            console.error('Error subscribing email:', error);
            setError('Failed to subscribe, please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="bg-blue-300 py-4">
            <div className="container flex flex-row items-center justify-start">
                <img
                    src="/assets/book-icon.png"
                    alt="icon"
                    className="ml-2 sm:ml-4 xs:mr-2 w-10 h-10 sm:w-16 sm:h-16"
                />
                <div className="pl-2">
                    <span className="text-black text-2xl sm:text-4xl xs:text-sm font-pacifico pl-0">Book Haven</span>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-4 space-x-* px-5 mx-auto justify-around">
                <div className="ml-5 font-IBM">
                    <h3 className="text-lg text-blue-800 font-bold">Keep up to date</h3>
                    <p className="font-sans">Join our newsletter for regular updates.</p>
                    <div className="mt-3 font-bold">Your Email: <br /></div>

                    <form onSubmit={handleSubscribeButton}>
                        <input
                            className="h-8 p-2"
                            type='email'
                            placeholder="example@email.com"
                            aria-label="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-600 text-sm mt-1">{error}</p>} {/* Show error message */}
                        {successMessage && <p className="text-green-600 text-sm mt-1">{successMessage}</p>} {/* Show success message */}
                        <LoadingButton
                            loading={isLoading}
                            loadingIndicator={<CircularProgress />}
                            className="ml-2"
                            variant="contained"
                            color="primary"
                            type="submit" // Submit form on button click
                        >
                            Join
                        </LoadingButton>
                    </form>
                </div>

                <div className="ml-10">
                    <h4 className="font-bold text-blue-800">SHOPPING GUIDE</h4>
                    <ul className="mt-2 space-y-1">
                        <li>Return Policy</li>
                        <li>Payments & Shipping</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-blue-800">INFORMATION</h4>
                    <ul className="mt-2 space-y-1">
                        <li>Blog</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Condition</li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold text-blue-800">QUICK HELP</h4>
                    <ul className="mt-2 space-y-1">
                        <li>Help Center</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
