import Link from "next/link";
import { useState } from "react";

export const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    return (
    <div className="relative">
        <div className="flex flex-col items-center justify-center" onClick={handleDropdown}>
            <div className="w-8 xs:w-5 h-1 bg-black mb-2 xs:mb-1"></div>
            <div className="w-8 xs:w-5 h-1 bg-black mb-2 xs:mb-1"></div>
            <div className="w-8 xs:w-5 h-1 bg-black"></div>
        </div>

        {isOpen && (
                <div className="absolute mt-4 w-40 bg-white border border-gray-300 rounded shadow-lg">
                    <Link href="/link1" className="block px-4 py-2 text-black hover:bg-gray-200">Link 1</Link>
                    <Link href="/link2" className="block px-4 py-2 text-black hover:bg-gray-200">Link 2</Link>
                    <Link href="/link3" className="block px-4 py-2 text-black hover:bg-gray-200">Link 3</Link>
                    <Link href="/link4" className="block px-4 py-2 text-black hover:bg-gray-200">Link 4</Link>
                </div>
            )}
    </div>
    );
}