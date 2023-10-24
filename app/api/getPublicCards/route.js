import { connectToDB } from '@/lib/dbConnect'
import PublicCardModel from '@/models/cardmodelspublic'
import { NextResponse } from 'next/server'

export const GET = async (req, res) => {

    try {
        await connectToDB();

        const allCards = await PublicCardModel.find().sort({ updatedAt: -1 });

        return NextResponse.json({ message: 'Cards Fetch Successfull', allCards }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: 'Get Cards Failed' }, { status: 500 });
    }
}

export const revalidate = 1;