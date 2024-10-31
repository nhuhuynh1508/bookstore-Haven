import Link from "next/link"

export const Subheader = () => {
    return (
        <div className="w-full bg-blue-900 text-white flex items-center justify-around font-eb_garamond font-semibold p-3">
            <Link href='/all-books'>
                <p>All Books</p>
            </Link>
            <Link href='/FAQ'>
                <p>FAQ</p>
            </Link>
            <p>Contact</p>
            <Link href='/about-us'>
                <p>About Us</p>
            </Link>
        </div>
    )
}