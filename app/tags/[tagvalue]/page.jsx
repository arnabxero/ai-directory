'use client'
import React, { useEffect, useState } from 'react';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import HeroCard from '@/components/HeroCard';
import TabBar from '@/components/TabBar';
import SearchBar from '@/components/SearchBar';
import Cards from '@/components/Cards';
import jwt from 'jsonwebtoken';

function normalizeString(str) {
    return str
        .normalize("NFKC") // Normalize to composed characters
        .replace(/\s+/g, " "); // Replace multiple spaces with a single space
}

const page = ({ params }) => {
    const [userToken, setUserToken] = useState('');
    const [userData, setUserData] = useState('');
    const [cardsData, setCardsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allTags, setAllTags] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [filteredCardsData, setFilteredCardsData] = useState(null);
    const [filteredCardsData2, setFilteredCardsData2] = useState(null);


    useEffect(() => {
        setUserToken(localStorage.getItem('userToken') || undefined);
        setUserData(localStorage.getItem('userData') || undefined);

        const autoLogOut = () => {
            let decoded = jwt.decode(localStorage.getItem('userToken'));
            if (!decoded || !decoded.exp) {
                return true;
            }
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        };

        if (localStorage.getItem('userToken') && autoLogOut()) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
        }
    }, []);

    useEffect(() => {
        const fetchCardsData = async () => {
            setIsLoading(true);


            const formDataPayload = {
                tag: decodeURIComponent(params.tagvalue),
            };


            try {
                const response = await fetch('/api/getCardsTagged', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataPayload),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
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

    useEffect(() => {
        // Create a temporary set to store unique tags
        const uniqueTagsSet = new Set();

        if (cardsData && Array.isArray(cardsData)) {
            // Iterate through cardsData to extract unique tags
            cardsData.forEach((card) => {
                if (card.tags && Array.isArray(card.tags)) {
                    card.tags.forEach((tag) => {
                        uniqueTagsSet.add(tag.trim()); // Trim the tag to remove leading/trailing spaces
                    });
                }
            });

            // Convert the set back to an array and update allTags
            setAllTags(Array.from(uniqueTagsSet));
            console.log(uniqueTagsSet);
        }
    }, [cardsData]);

    // useEffect(() => {
    //     // Filter cards based on decoded params.tagvalue
    //     if (cardsData && params.tagvalue) {
    //         const decodedTagValue = decodeURIComponent(params.tagvalue); // Decode URL component
    //         const filteredData = cardsData.filter(card => {
    //             if (card.tags && Array.isArray(card.tags)) {
    //                 return card.tags.some(tag => (decodeURIComponent(tag)) === decodedTagValue);
    //             }
    //             return false;
    //         });
    //         setFilteredCardsData(filteredData);
    //     } else {
    //         // If no tagvalue is provided or if cardsData is not available, use the original cardsData
    //         setFilteredCardsData(cardsData);
    //     }

    //     console.log(filteredCardsData);

    // }, [cardsData, params.tagvalue]);


    useEffect(() => {
        // Use this effect to filter cards when searchString changes
        if (searchString.length > 0) {
            const filteredCards = cardsData.filter((card) =>
                card.title.toLowerCase().includes(searchString.toLowerCase())
            );
            setFilteredCardsData2(filteredCards);
        } else {
            // If searchString is empty, reset to the original data
            setFilteredCardsData2(cardsData);
        }
    }, [searchString, cardsData]);


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
                    <HeroCard />
                </div>

                <div className='flex justify-center'>
                    <TabBar allTags={params.tagvalue} singleTag='true' />
                </div>
                <div className='flex justify-center'>
                    <SearchBar setSearchString={setSearchString} />
                </div>
                <div className='flex justify-center'>
                    <Cards cardsData={filteredCardsData2} setCardsData={setCardsData} />
                </div>
            </div>
        </div>
    )
}

export default page;
