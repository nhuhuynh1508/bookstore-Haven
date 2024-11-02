'use client'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Footer } from '../components/footer';
import { Header } from "../components/header";
import { Subheader } from "../components/subheader";

export default function Contact() {
    return(
        <>
        <Header />
        <Subheader />
            <img
                src='/assets/banner2.jpg'
                alt="banner"
                className="w-full h-80 object-cover"
            />
            <div className="flex items-center m-3">
                    <span className="xs:text-3xl sm:text-5xl font-eb_garamond font-bold border-gray-300 p-5">Contact Us</span>
                    <hr className="w-1/2 flex-grow mx-auto border-t-2 border-gray-300"/>
            </div>
            <p className='text-xl pl-8 font-montserrat'>If you are a customer of us and have questions to ask, reach us through:</p>
            <div className='pl-8 m-3'>
                <p className='items-center font-bold p-3'><MailIcon/>bookstoreHaven.sdc@gmail.com</p>
                <p className='font-bold p-3'><LocationOnIcon/>Ho Chi Minh City, Vietnam</p>
                <p className='font-bold p-3'><PhoneIcon/>+84 1234 5678</p>
            </div>
        <Footer />
        </>
    )
}