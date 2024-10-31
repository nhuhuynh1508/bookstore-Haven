
export const CartBackground = () => {
    return (
        <>
        <div>
            <img
                src='/assets/bookcart.jpg'
                alt="bookcart"
                className="w-full h-80 object-cover"
            />
        </div>
            <div className="flex items-center p-4">
                <span className="xs:text-3xl sm:text-5xl font-eb_garamond font-bold border-gray-300 pb-2 pt-2">Cart</span>
                <hr className="w-full my-2 border-t-2 border-gray-300"/>
            </div>
        </>
    )
}
