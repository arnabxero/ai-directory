import { connectToDB } from '@/lib/dbConnect'
import CardModel from '@/models/cardmodel'
import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
export const POST = async (req, res) => {

    try {
        const headersList = headers();
        const authHeader = headersList.get('authorization');
        const authToken = authHeader ? authHeader.split(' ')[1] : null;

        const UserData = jwt.decode(authToken);

        // UserData.bookmarks has some strings, which are cardmodel's _id, need to get all these cardmodels from the database
        await connectToDB();

        // Assuming UserData.bookmarks is an array of cardmodel _id strings
        const bookmarkIds = UserData.bookmarks;

        // Fetch card models based on the bookmarkIds
        const filteredCards = await CardModel.find({ _id: { $in: bookmarkIds } });

        const totalCards = filteredCards.length; // Total number of filtered cards

        return NextResponse.json({
            message: 'Cards Fetch Successful',
            allCards: filteredCards, // Use filteredCards instead of allCards
        }, { status: 200 });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: 'Get Cards Failed' }, { status: 500 });
    }
}
