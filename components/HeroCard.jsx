'use client'
import React, { useState } from 'react';
import { Loader2, Check } from 'lucide-react';

const HeroCard = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Make a POST request to '/api/addSubscriber' with the email data
        try {
            const response = await fetch('/api/addSubscriber', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message or redirect the user
                console.log('Subscriber added successfully');
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                }, 2000);

            } else {
                // Handle error, e.g., show an error message
                console.error('Failed to add subscriber');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-3 lg:px-6 max-w-[1020px] w-full">
            <div className="hero-div">
                <h3 className="hero-div-heading">Discover the latest tools and trends in AI 🔮</h3>
                <div className="mt-3 text-sm">
                    Join 40,000+ subscribers including Amazon, Apple, Google, and Microsoft employees reading our free newsletter.
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-start text-sm">
                        <div className="mt-4 p-2 bg-[#F7F7F7] rounded-lg border flex justify-between">
                            <input
                                className="focus:outline-none bg-transparent w-10vw md:w-[20vw] focus:border-none text-xs"
                                placeholder="email@example.com"
                                value={email}
                                required
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="bg-black text-white px-2 py-1 rounded-md text-xs" type="submit">
                                {!success ? (isLoading ? <><Loader2 size={16} className='animate-spin' /></> : <>Subscribe</>) : (isLoading ? <><Loader2 size={16} className='animate-spin' /></> : <><Check size={16} /></>)}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HeroCard;
