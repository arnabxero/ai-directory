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

        // Find the public card by card_id
        const publicCard = await PublicCardModel.findOne({ _id: card_id });

        const publicCardObj = publicCard.toObject();

        console.log(publicCardObj);

        if (!publicCard) {
            return NextResponse.json({ message: 'Public Card not found' }, { status: 404 });
        }

        // Create a new CardModel with the data from the public card
        const newCardModel = new CardModel(publicCardObj);

        // Save the new CardModel
        await newCardModel.save();

        // Delete the public card
        await PublicCardModel.deleteOne({ _id: card_id });
        // const allCards = await PublicCardModel.find().sort({ updatedAt: -1 });

        return NextResponse.json({ message: 'Card Created Successfully' }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to Create Card', error: err.message }, { status: 500 });
    }
};
