import { connectToDB } from '@/lib/dbConnect';
import CardModel from '@/models/cardmodel';
import PublicCardModel from '@/models/cardmodelspublic'
import { NextResponse } from 'next/server';
import { verifyTokenStrict } from '@/lib/tokenHandler';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';


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

        // Create a new CardModel with the data from the public card
        const existingPublicCard = PublicCardModel.findOne({ _id: card_id });

        if (!existingPublicCard) {
            return NextResponse.json({ message: 'Not Found!' }, { status: 404 });

        }

        // Delete the public card
        await PublicCardModel.deleteOne({ _id: card_id });

        // const allCards = await PublicCardModel.find().sort({ updatedAt: -1 });

        return NextResponse.json({ message: 'Card Deleted Successfully' }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to Delete Card', error: err.message }, { status: 500 });
    }
};
