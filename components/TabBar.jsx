'use client'
import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TabBar = ({ allTags, singleTag }) => {
    const dummyData = [
        'ABCD', 'ABCD', 'HUBJN', 'UHIUIOJN', 'IJOHUGY', 'ABCD', 'HUBJN', 'UHIUIOJN',
        'IJOHUGY', 'HUBJN', 'UHIUIOJN', 'IJOHUGY', 'ABCD', 'HUBJN', 'UHIUIOJN', 'IJOHUGY',
        'ABCD', 'HUBJN', 'UHIUIOJN', 'IJOHUGY'
    ];

    console.log(allTags);


    // UI Control Code
    const containerRef = useRef(null);
    const isScrollingRef = useRef(false);

    const handleScrollLeft = () => {
        startScrolling(-5); // Adjust the scroll speed as needed
    };

    const handleScrollRight = () => {
        startScrolling(5); // Adjust the scroll speed as needed
    };

    const startScrolling = (scrollSpeed) => {
        if (!isScrollingRef.current) {
            isScrollingRef.current = true;
            scroll(scrollSpeed);
        }
    };

    const scroll = (scrollSpeed) => {
        const container = containerRef.current;
        container.scrollLeft += scrollSpeed;

        if (isScrollingRef.current) {
            requestAnimationFrame(() => scroll(scrollSpeed));
        }
    };

    const stopScrolling = () => {
        isScrollingRef.current = false;
    };

    return (
        <div className='flex lg:px-6 w-[100vw] max-w-[1020px] text-xs'>
            <button
                className='border rounded-md px-1 py-1 mx-1 bg-white'
                onMouseDown={handleScrollLeft}
                onMouseUp={stopScrolling}
            >
                <ChevronLeft size={15} />
            </button>
            <div className='flex w-screen overflow-scroll' ref={containerRef}>
                <div className='flex'>
                    {singleTag === 'true' ? (
                        <Link href={`/tags/${decodeURIComponent(allTags)}`}>
                            <div className='border rounded-md px-4 py-1 mx-1 bg-white'>{decodeURIComponent(allTags)}</div>
                        </Link>
                    ) : (
                        allTags && allTags.map((item, index) => (
                            <Link key={index} href={`/tags/${item}`}>
                                <div className='border rounded-md px-4 py-1 mx-1 bg-white'>{item}</div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <button
                className='border rounded-md px-1 py-1 mx-1 bg-white'
                onMouseDown={handleScrollRight}
                onMouseUp={stopScrolling}
            >
                <ChevronRight size={15} />
            </button>
        </div>
    );
};

export default TabBar;
