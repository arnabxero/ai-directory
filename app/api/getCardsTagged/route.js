import { connectToDB } from '@/lib/dbConnect'
import CardModel from '@/models/cardmodel'
import { NextResponse } from 'next/server'

export const POST = async (req, res) => {
    const { tag } = await req.json();
    console.log(tag);
    //arnab
    try {
        await connectToDB();

        let query = {};

        // Check if a tag was provided in the request, and if so, filter by it
        if (tag) {
            query = { tags: tag };
        }

        const allCards = await CardModel.find(query).sort({ updatedAt: -1 });

        return NextResponse.json({ message: 'Cards Fetch Successful', allCards }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: 'Get Cards Failed' }, { status: 500 });
    }
}

export const revalidate = 1;
