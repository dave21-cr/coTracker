import React, { useState, useEffect } from 'react';

interface CountdownProps {
    startDate: Date;
    endDate: Date;
    index:number;
    handleChange: (index:number)=>void;
}

const Countdown: React.FC<CountdownProps> = ({ startDate, endDate,index,handleChange }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = endDate.getTime() - now.getTime();

        if (difference <= 0) {
            return null;
        }

        const timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        handleChange(index)
        return <div style={{ color: 'red' }}>0</div>;
    }

    return (
        <div>
            {timeLeft.days}d / {timeLeft.hours}h / {timeLeft.minutes}m / {timeLeft.seconds}s left
        </div>
    );
};

export default Countdown;
