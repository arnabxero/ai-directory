'use client'
import React, { useEffect, useState } from 'react'
import { Bookmark, ArrowUpRightSquare, Loader2, Trash2, CheckSquare } from 'lucide-react'
import jwt from 'jsonwebtoken';

const SingleCard = ({ cardData, setCardsData, bookmarks, admin, review }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isInBookmark, setIsInBookmark] = useState(false);
    const [refreshCards, setRefreshCards] = useState(false);
    const [hideOrNot, setHideOrNot] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const bookmarks = userData?.bookmarks || [];
        const isCardInBookmarks = bookmarks.includes(cardData._id);
        setIsInBookmark(isCardInBookmarks);
        setRefreshCards(false);
    }, [cardData, refreshCards]);

    const handleRemoveBookmark = async (e) => {

        const formData = {
            card_id: cardData._id
        }

        setIsLoading(true);
        try {
            const response = await fetch('api/removeBookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('userToken'),
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData);
                // setCardsData(responseData.allCards);
                setRefreshCards(true);
                if (responseData.newToken.length > 0) {
                    localStorage.setItem('userToken', responseData.newToken);
                    localStorage.setItem('userData', JSON.stringify(jwt.decode(responseData.newToken)));
                    console.log((responseData.newToken));
                }

            } else {
                console.log(responseData);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);

        }
    };

    const handleAddBookmark = async (e) => {

        console.log(localStorage.getItem('userToken'));

        if (localStorage.getItem('userToken') === null) {

            window.location.href = '/login';
        } else {
            const formData = {
                card_id: cardData._id
            }
            setIsLoading(true);


            try {
                const response = await fetch('api/addBookmark', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem('userToken'),
                    },
                    body: JSON.stringify(formData),
                });

                const responseData = await response.json();

                if (response.ok) {
                    console.log(responseData);
                    // setCardsData(responseData.allCards);
                    setRefreshCards(true);
                    if (responseData.newToken.length > 0) {
                        localStorage.setItem('userToken', responseData.newToken);
                        localStorage.setItem('userData', JSON.stringify(jwt.decode(responseData.newToken)));
                        console.log((responseData.newToken));
                    }

                } else {
                    console.log(responseData);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setIsLoading(false);

            }
        }
    };


    const handleDelete = async (e) => {

        console.log(localStorage.getItem('userToken'));

        if (localStorage.getItem('userToken') === null) {

            window.location.href = '/login';
        } else {
            const formData = {
                card_id: cardData._id
            }
            setIsLoading(true);


            try {
                const response = await fetch('/api/deleteCard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem('userToken'),
                    },
                    body: JSON.stringify(formData),
                });

                const responseData = await response.json();

                if (response.ok) {
                    console.log(responseData);
                    // setCardsData(responseData.allCards);

                    window.location.reload();

                } else {
                    console.log(responseData);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setIsLoading(false);

            }
        }
    };

    const handleApprove = async (e) => {

        console.log(localStorage.getItem('userToken'));

        if (localStorage.getItem('userToken') === null) {

            window.location.href = '/login';
        } else {
            const formData = {
                card_id: cardData._id
            }
            setIsLoading(true);


            try {
                const response = await fetch('/api/approveCard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem('userToken'),
                    },
                    body: JSON.stringify(formData),
                });

                const responseData = await response.json();

                if (response.ok) {
                    // console.log(responseData);
                    // setCardsData(responseData.allCards);

                    setHideOrNot(true);

                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1200);

                } else {
                    console.log(responseData);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setIsLoading(false);

            }
        }
    };

    const handleReviewDelete = async (e) => {

        console.log(localStorage.getItem('userToken'));

        if (localStorage.getItem('userToken') === null) {

            window.location.href = '/login';
        } else {
            const formData = {
                card_id: cardData._id
            }
            setIsLoading(true);


            try {
                const response = await fetch('/api/deleteReviewCard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem('userToken'),
                    },
                    body: JSON.stringify(formData),
                });

                const responseData = await response.json();

                if (response.ok) {
                    // console.log(responseData);
                    // setCardsData(responseData.allCards);

                    setHideOrNot(true);

                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1200);

                } else {
                    console.log(responseData);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setIsLoading(false);

            }
        }
    };


    if (bookmarks === 'true' && !isInBookmark) {
        return null;
    } else {
        return (
            // <div className={`${hideOrNot ? 'hidden' : 'display-block'}`}>
            <div className={`${hideOrNot ? 'hidden' : 'display-block'} bg-white border rounded-lg min-w-[315px] min-h-[425px] m-1.5 flex-grow p-5`}>
                <div className='flex justify-center'>
                    <img
                        className='flex-grow rounded-lg max-h-[200px] max-w-[270px]'
                        src={cardData.thumbnail} height={220} width={220} />
                </div>
                <div className='font-bold mt-1'>
                    {cardData?.title}
                </div>
                <div className='text-xs mt-1'>
                    {cardData?.tags?.map((tag, index) => (
                        <span key={index} className='mr-2'>
                            {tag.trim()}
                        </span>
                    ))}
                </div>
                <div className='text-sm mt-1 max-w-[260px] text-justify overflow-hidden'>
                    {cardData?.summary}
                </div>
                <div className='mt-6 flex flex-col justify-center items-center text-xs font-bold'>
                    {isInBookmark ? (
                        <button
                            onClick={handleRemoveBookmark}
                            className='border px-4 py-2 w-full rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300'>
                            {isLoading ? (<Loader2 size={20} className='animate-spin' />) : (<>Remove Bookmark <Bookmark className='inline-block pl-1' size={20} /></>)}
                        </button>
                    ) : (
                        <button
                            onClick={handleAddBookmark}
                            className='border px-4 py-2 w-full rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300'>
                            {isLoading ? (<Loader2 size={20} className='animate-spin' />) : (<>Bookmark <Bookmark className='inline-block pl-1' size={20} /></>)}

                        </button>
                    )}

                    <a className='border px-4 py-2 w-full mt-2 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300' href={cardData?.siteurl}>
                        Learn More <ArrowUpRightSquare className='inline-block pl-1' size={20} />
                    </a>

                    {admin === 'true' && (
                        <button
                            onClick={handleDelete}
                            className='border px-4 py-2 w-full mt-2 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300'>
                            {isLoading ? (<Loader2 size={20} className='animate-spin' />) : (<>Delete <Trash2 className='inline-block pl-1' size={20} /></>)}
                        </button>
                    )}

                    {review === 'true' && (
                        <>
                            <button
                                onClick={handleApprove}
                                className='border px-4 py-2 w-full mt-2 rounded-lg flex items-center justify-center hover:bg-lime-700 hover:text-white transition-all duration-300'>
                                {isLoading ? (<Loader2 size={20} className='animate-spin' />) : (<>Approve <CheckSquare className='inline-block pl-1' size={20} /></>)}
                            </button>
                            <button
                                onClick={handleReviewDelete}
                                className='border px-4 py-2 w-full mt-2 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300'>
                                {isLoading ? (<Loader2 size={20} className='animate-spin' />) : (<>Delete <Trash2 className='inline-block pl-1' size={20} /></>)}
                            </button>
                        </>

                    )}
                </div>
            </div>
            // </div>
        )
    }
}

export default SingleCard