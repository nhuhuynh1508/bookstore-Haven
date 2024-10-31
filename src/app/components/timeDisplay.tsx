import moment from 'moment';
import { useEffect, useState } from 'react';

const CurrentTimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        setCurrentTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
        const interval = setInterval(() => {
            setCurrentTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
        }, 1000);

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);


    return (
        <div className='flex justify-end p-5'>
            <p className='font-IBM font-bold rounded-lg bg-blue-400 text-white text-lg'>{currentTime}</p>
        </div>
    );
};

export default CurrentTimeDisplay;
