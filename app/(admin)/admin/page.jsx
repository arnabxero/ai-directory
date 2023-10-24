'use client'
import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'

const page = () => {
    useEffect(() => {
        let decoded = jwt.decode(localStorage.getItem('userToken'));

        if (!decoded || decoded.role !== 'admin') {
            window.location.href = './';
        }

    }, []);
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <a className='border px-4 py-2 m-2 hover:bg-black hover:text-white transition-all duration-300 rounded-lg'
                href='/'>GoTo Home</a>
            <a className='border px-4 py-2 m-2 hover:bg-black hover:text-white transition-all duration-300 rounded-lg'
                href='/admin/createCard'>Create Card</a>
            <a className='border px-4 py-2 m-2 hover:bg-black hover:text-white transition-all duration-300 rounded-lg'
                href='/admin/review'>Review Submitted Cards</a>
            <a className='border px-4 py-2 m-2 hover:bg-black hover:text-white transition-all duration-300 rounded-lg'
                href='/admin/delete'>Delete Cards</a>
            {/* <a className='border px-4 py-2 m-2 hover:bg-black hover:text-white transition-all duration-300 rounded-lg'
                href='/admin/edit'>Edit Cards</a> */}
        </div>
    )
}

export default page