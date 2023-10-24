import { connectToDB } from '@/lib/dbConnect';
import CardModel from '@/models/cardmodel';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyTokenStrict } from '@/lib/tokenHandler';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
    const { card_id } = await req.json();
    console.log(card_id);

    try {
        const headersList = headers();
        const authHeader = headersList.get('authorization');
        const authToken = authHeader ? authHeader.split(' ')[1] : null;

        if (!verifyTokenStrict(authToken)) {
            return NextResponse.json({ message: 'Token Invalid!' }, { status: 305 });
        }

        const AdminData = jwt.decode(authToken);

        if (AdminData.role !== 'admin') {
            return NextResponse.json({ message: 'No Access!' }, { status: 401 });
        }

        await connectToDB();

        // Find the card by card_id and delete it
        const deletedCard = await CardModel.findOneAndDelete({ _id: card_id });

        if (!deletedCard) {
            return NextResponse.json({ message: 'Card not found or could not be deleted' }, { status: 404 });
        }

        // const allCards = await CardModel.find().sort({ updatedAt: -1 });

        return new Response(JSON.stringify({ message: 'Card Deleted Successfully' }), { status: 200 });
    } catch (err) {
        return new Response("Failed to delete card", { status: 500 });
    }
};
