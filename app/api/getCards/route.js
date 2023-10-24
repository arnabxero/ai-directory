import { connectToDB } from '@/lib/dbConnect'
import CardModel from '@/models/cardmodel'
import { NextResponse, NextRequest } from 'next/server'

export const POST = async (req, res) => {
    const { page, perPage, searchString } = await req.json();
    try {
        await connectToDB();
        const totalCards = await CardModel.countDocuments(); // Get the total number of cards
        const skip = (page - 1) * perPage;

        // Query to filter cards by matching the searchString value
        let filteredCards;

        if (searchString && searchString.trim() !== '') {
            filteredCards = await CardModel.find({
                title: { $regex: searchString, $options: 'i' } // Case-insensitive search
            })
                .skip(skip)
                .limit(100); // Limit to a maximum of 100 matched results
        } else {
            filteredCards = await CardModel.find()
                .skip(skip)
                .limit(perPage);
        }

        return NextResponse.json({
            message: 'Cards Fetch Successful',
            allCards: filteredCards, // Use filteredCards instead of allCards
            totalCards: totalCards, // Total cards remains the same
            currentPage: page,
            totalPages: Math.ceil(totalCards / perPage)
        }, { status: 200 });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: 'Get Cards Failed' }, { status: 500 });
    }
}
