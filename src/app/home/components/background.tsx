import React from "react"

export const Background = () => {
    return (
    <div className="mt-20">
            <img
                src="/assets/books.jpg"
                alt="book"
                style={{ width: '100%', height: '50%' }}
            />
            <span className="absolute bottom-56 pb-28 pl-12 font-lato font-bold text-white text-5xl">
                --Welcome to Book Haven--
            </span>
            <p className="absolute bottom-52 pb-10 m-4 text-white text-left pl-12 text-xl">
            Discover a world of stories, knowledge, and inspiration. Whether you're looking for the latest bestsellers, timeless classics, or hidden gems, we have something for every reader. Dive into your next great read today!
            </p>
        </div>
    )
}