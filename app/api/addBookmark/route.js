import { connectToDB } from '@/lib/dbConnect'
import UserModel from '@/models/usermodel'
import CardModel from '@/models/cardmodel';
import bcrypt from 'bcrypt';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'
import { verifyTokenStrict } from '@/lib/tokenHandler';
import jwt from 'jsonwebtoken';
import { generateToken } from '@/lib/tokenHandler';

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

        const user_id = jwt.decode(authToken)._id;

        await connectToDB();

        // Find the user by their ID
        const user = await UserModel.findById(user_id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Check if card_id already exists in bookmarks array
        if (!user.bookmarks.includes(card_id)) {
            // If not, add it to the array
            user.bookmarks.push(card_id);

            // Save the updated user model
            await user.save();
        }

        const existingUser = await UserModel.findById(user_id);
        const updatedUserObject = existingUser.toObject();
        delete updatedUserObject.password;
        const signed_token = generateToken(updatedUserObject);

        console.log(signed_token);

        // const allCards = await CardModel.find().sort({ updatedAt: -1 });

        return new Response(JSON.stringify({ message: 'Card Created Successfully', newToken: signed_token }), { status: 200 });

    } catch (err) {
        return new Response("Failed to Create Card", { status: 500 });
    }
}
