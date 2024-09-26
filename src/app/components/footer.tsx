export const Footer = () => {
    return(
        <footer className="bg-blue-100 py-4">
            <div className="container mx-auto flex flex-col items-center justify-center text-center">
                    <img
                        src="/assets/book-icon.png"
                        alt="icon"
                        className="ml-2 sm:ml-4 xs:mr-2 w-10 h-10 sm:w-16 sm:h-16"
                    />
                    <span className="text-black text-2xl sm:text-4xl xs:text-sm font-pacifico pl-3">Book Haven</span>
                <p className="text-black xs:text-sm mt-2">2024 @Book Haven. All Rights Reserved.</p>
            </div>
        </footer>
    )
}