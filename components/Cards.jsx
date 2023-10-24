'use client'
import React, { useState } from 'react'
import SingleCard from '@/components/SingleCard'

const Cards = ({ cardsData, setCardsData, bookmarks, admin, review }) => {
    if (!cardsData) {
        return (
            <>
                Loading...
            </>
        )
    }

    return (
        <div className='flex flex-wrap mt-1.5 lg:px-6 max-w-[1030px] w-full'>
            {cardsData.map((cardData, index) => (
                <SingleCard key={index} cardData={cardData} setCardsData={setCardsData} bookmarks={bookmarks} admin={admin} review={review} />
            ))}
        </div>
    )
}

export default Cards
