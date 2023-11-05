import { connectToDB } from '@/lib/dbConnect';
import CardModel from '@/models/cardmodel';
import { verifyTokenStrict } from '@/lib/tokenHandler';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
    try {
        await connectToDB();

        const formData = await req.json();

        for (const cardData of formData) {
            const existingCard = await CardModel.findOne({ title: cardData.title });

            if (existingCard) {
                existingCard.thumbnail = cardData.thumbnail;
                existingCard.tags = cardData.tags;
                existingCard.summary = cardData.summary;
                existingCard.siteurl = cardData.siteurl;
                await existingCard.save();
            } else {
                const newCardModel = new CardModel(cardData);
                await newCardModel.save();
            }
        }

        return new Response(JSON.stringify({ message: 'Cards Created/Updated Successfully', formData }), { status: 200 });

    } catch (err) {
        return new Response("Failed to Create/Update Cards", { status: 500 });
    }
}
