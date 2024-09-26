
export const Background = () => {
    return (
    <div className="mt-16 relative">
            <img
                src="/assets/bookstore_1.jpg"
                alt="book"
                className="w-full h-[30vh] md:h-[60vh] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center pl-6 sm:pl-10 md:pl-16">
                <span className="p-2 font-eb_garamond font-bold text-white text-3xl sm:text-4xl md:text-5xl">
                    Welcome to Book Haven
                </span>
                <p className="p-4 text-white text-sm sm:text-base md:text-2xl font-bodoni_moda sm:max-w-[50%] md:max-w-[90%]">
                    Discover a world of stories, knowledge, and inspiration. Whether you're looking for the latest bestsellers, timeless classics, or hidden gems, we have something for every reader. Dive into your next great read today!
                </p>
            </div>
        </div>
    )
}