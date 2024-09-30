// import MUI components
import { Button } from "@mui/material";
// import hook
import { useState } from "react";

export const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribeButton = () => {
        if (email) {
            const existedEmails = JSON.parse(localStorage.getItem('emails')) || [];

            if (!existedEmails.includes(email)){
                existedEmails.push(email);
                localStorage.setItem('emails', JSON.stringify(existedEmails));
                setEmail('');
                alert('Email subscribed');
            } else {
                alert('Email already subscribed');
            }
        }
        
    }

    return(
        <footer className="bg-blue-100 py-4">
            <div className="container mx-auto flex flex-row items-center justify-start">
                    <img
                        src="/assets/book-icon.png"
                        alt="icon"
                        className="ml-2 sm:ml-4 xs:mr-2 w-10 h-10 sm:w-16 sm:h-16"
                    />
                    <div className="pl-4">
                        <span className="text-black text-2xl sm:text-4xl xs:text-sm font-pacifico pl-0">Book Haven</span>
                    </div>
                    
            </div>
            
            <div className="m-5 font-IBM">
                <h3 className="text-lg text-blue-800 font-bold">Keep up to date</h3>
                <p>Join our newsletter for regular updates.</p>
                <div className="mt-3 font-bold">Your Email: <br/></div>
                    <input
                        className="h-8 p-2"
                        type='email'
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        className="ml-2"
                        variant="contained"
                        color="primary"
                        onClick={handleSubscribeButton}
                    >
                    Subscribe
                    </Button>
            </div>
        </footer>
    )
}