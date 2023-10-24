'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Loader2, Check } from 'lucide-react';

const Footer = ({ allTags }) => {

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
        <div className='max-w-[1020px] w-full p-8'>

            <div className='flex flex-col md:flex-row justify-between w-full mb-3'>
                <div className='flex flex-col'>
                    <span className='font-bold pb-2 py-1 pl-1.5'>Tools</span>

                    {allTags.slice(0, 20).map((item, index) => (
                        <Link key={index} href={`/tags/${item}`}>
                            <div className='text-xs py-1 mx-1 hover:text-orange-500'>{item}</div>
                        </Link>
                    ))}
                </div>
                <div className='flex flex-col mt-4 md:mt-0'>
                    <span className='font-bold py-1 pb-2 pl-1.5'>About</span>
                    <Link href='/public-submit'>
                        <div className='text-xs pr-1 mx-1 hover:text-orange-500'>SUBMIT A TOOL</div>
                    </Link>

                </div>
                <div className='flex flex-col mt-4 md:mt-0'>
                    <span className='font-bold py-1 pb-2 pl-1.5'>Newslatter</span>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-start text-sm">
                            <div className=" p-2 bg-[#F7F7F7] rounded-lg border flex justify-between">
                                <input
                                    className="focus:outline-none bg-transparent w-10vw md:w-[20vw] focus:border-none text-xs"
                                    placeholder="email@example.com"
                                    value={email}
                                    required
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="bg-black text-white px-2 py-1 rounded-md text-xs" type="submit">
                                    {!success ? (isLoading ? <><Loader2 size={16} className='animate-spin' /></> : <>Submit</>) : (isLoading ? <><Loader2 size={16} className='animate-spin' /></> : <><Check size={16} /></>)}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='border-t'>
                <div className="text-center text-gray-500 mt-6">
                    <p className='text-sm'>&copy; {new Date().getFullYear()} Eftakhar Arnob. All rights reserved.</p>
                    <p className='mt-2 text-sm'>
                        Developed with ❤️ by <a href="https://arnob.dev" className="text-blue-500 hover:underline">ArnabXero</a> on Xero Inc.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer