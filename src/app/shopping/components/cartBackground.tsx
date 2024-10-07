
export const CartBackground = () => {
    

    return (
        <>
        <div className="mt-10">
            <img
                src='/assets/bookcart.jpg'
                alt="bookcart"
                className="w-full h-80 object-cover"
            />
        </div>
            <div className="flex items-center p-4">
                <span className="xs:text-3xl sm:text-5xl font-serif border-gray-300 pb-2 pt-2">Cart</span>
                <hr className="w-full my-2 border-t-2 border-gray-300"/>
                <hr></hr>
            </div>
        </>
    )
}
