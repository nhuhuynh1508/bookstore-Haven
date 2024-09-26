import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchBar = () => {
    const [input, setInput] = useState("")
    const router = useRouter()

    const handleChange = (e) => {
        const value = e.target.value
        setInput(value)
    }

    const handleSearch = () => {
        if (input) {
            router.push(`/home?search=${input}`)
        }
    }

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 sm:h-10 xs:h-8 p-3 sm:p-3 pl-5 xs:pl-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border"
                onChange={handleChange} value = {input}
                onKeyDown={(e) => e.key == "Enter" && handleSearch()}
            />
            <img
                src='./assets/search.png'
                alt='icon'
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
        </div>
    )
}