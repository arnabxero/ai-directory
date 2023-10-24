'use client'
import React, { useEffect, useState } from 'react'
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import HeroCard from '@/components/HeroCard';
import TabBar from '@/components/TabBar';
import SearchBar from '@/components/SearchBar';
import Cards from '@/components/Cards';

const page = () => {
    const [userToken, setUserToken] = useState('');
    const [userData, setUserData] = useState('');
    const [cardsData, setCardsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUserToken(localStorage.getItem('userToken') || undefined);
        setUserData(localStorage.getItem('userData') || undefined);

        console.log(localStorage.getItem('userToken'));
        console.log(userToken, userData);

        if (localStorage.getItem('userToken') === null) {

            window.location.href = '/login';
        }

    }, []);

    useEffect(() => {

        const fetchCardsData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch('/api/getCardsBookmarked', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken') // Add the userToken as an Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCardsData(data.allCards);
                } else {
                    console.error('Failed to fetch class data');
                }
            } catch (error) {
                console.error('Error while fetching class data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardsData();

    }, []);


    return (
        <div className='bg-[#F7F7F7] min-h-screen'>
            <div className="sticky top-0">
                <TopBanner />
                <div className='flex justify-center border-b bg-[#FFFFFF]'>
                    <Navbar UserData={userData} />
                </div>
            </div>

            <div className='mx-5 flex-col'>
                <div className='flex justify-center'>
                    <Cards cardsData={cardsData} setCardsData={setCardsData} bookmarks='true' />
                </div>
            </div>
        </div>
    )
}

export default page