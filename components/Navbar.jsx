

import React, { useState } from 'react';
import UserButton from '@/components/UserButton';

const Navbar = ({ UserData }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <div className='max-w-[1020px] w-full'>
            <div className='flex items-center justify-between px-6 py-2 text-sm'>
                <div className='flex space-x-4 items-center'>
                    <a href='../'><img src='/logo.png' height={40} width={40} className='rounded-lg' /></a>
                </div>

                {/* Hamburger menu button */}
                <div className='lg:hidden'>
                    <button
                        onClick={toggleMenu}
                        className='text-xl text-gray-600 hover:text-gray-800 focus:outline-none'
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile menu */}
                {showMenu && (
                    <div className='lg:hidden fixed top-0 left-0 h-screen w-full bg-white z-50'>
                        <div className='flex flex-col items-center justify-center h-full'>
                            {/* Close button */}
                            <button
                                onClick={closeMenu}
                                className='absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none'
                            >
                                &#215;
                            </button>
                            <a className='hover:text-orange-500 hover:bg-black transition-all duration-300 border px-4 py-2 rounded-lg my-3' href='../'>🏠Home</a>
                            <a className='hover:text-orange-500 hover:bg-black transition-all duration-300 border px-4 py-2 rounded-lg my-3' href='../bookmarks'>🔖 Bookmarks</a>
                            <a className='hover:text-orange-500 hover:bg-black transition-all duration-300 border px-4 py-2 rounded-lg my-3' href='../public-submit'>📥 Submit</a>
                        </div>
                    </div>
                )}

                {/* Desktop menu */}
                <div className='hidden lg:flex space-x-4 items-center'>
                    <a className='hover:text-orange-500 transition-all duration-300' href='../'>🏠Home</a>
                    <a className='hover:text-orange-500 transition-all duration-300' href='../bookmarks'>🔖 Bookmarks</a>
                    <a className='hover:text-orange-500 transition-all duration-300' href='../public-submit'>📥 Submit</a>
                </div>

                <div>
                    <UserButton UserData={UserData} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;