// import MUI components
// import hook
import { useState } from "react";
// import LoadingButton
import { LoadingButton } from "@mui/lab";

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribeButton = () => {
        if (email) {
            const existedEmails = JSON.parse(localStorage.getItem('emails')) || [];
            setIsLoading(true)

            if (!existedEmails.includes(email)){
                existedEmails.push(email);
                localStorage.setItem('emails', JSON.stringify(existedEmails));
            setTimeout(() => {
                setIsLoading(false)
                setEmail('')
                alert('Email subscribed')
            }, 1000);


            } else {
                setIsLoading(false)
                alert('Email already subscribed');
            }
        }
        
    }

    return(
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
                    <div className="mt-3 font-bold">Your Email: <br/>
                </div>
                    <input
                        className="h-8 p-2"
                        type='email'
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <LoadingButton
                        loading={isLoading}
                        loadingIndicator="Loading…"
                        className="ml-2"
                        variant="contained"
                        color="primary"
                        onClick={handleSubscribeButton}
                    >
                    Join
                    </LoadingButton>
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
    )
}