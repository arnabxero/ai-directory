import { connectToDB } from '@/lib/dbConnect';
import UserModel from '@/models/usermodel';
import CardModel from '@/models/cardmodel';
import bcrypt from 'bcrypt';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyTokenStrict } from '@/lib/tokenHandler';
import jwt from 'jsonwebtoken';
import { generateToken } from '@/lib/tokenHandler';

export const POST = async (req, res) => {
    const { ...formData } = await req.json();

    console.log(formData);
    try {
        const headersList = headers();
        const authHeader = headersList.get('authorization');
        const authToken = authHeader ? authHeader.split(' ')[1] : null;

        if (!verifyTokenStrict(authToken)) {
            return NextResponse.json({ message: 'Token Invalid!' }, { status: 305 });
        }

        const user_id = jwt.decode(authToken)._id;

        await connectToDB();

        // Find the user by their user_id or any other unique identifier
        const existingUser = await UserModel.findOne({ _id: user_id });

        if (!existingUser) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Update user information with the new data
        if (formData.email) {
            formData.email = formData.email;
        }
        if (formData.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(formData.password, saltRounds);
            formData.password = hashedPassword;
        }
        // Update other fields as needed...

        // // Save the updated user information
        // await existingUser.save();

        Object.assign(existingUser, formData);
        await existingUser.save();

        delete existingUser.password;

        const existingUserObject = existingUser.toObject();

        const newToken = generateToken(existingUserObject);

        console.log(existingUser);

        return new Response(JSON.stringify({ message: 'User updated successfully', newUserData: existingUser, newToken }), { status: 200 });

    } catch (err) {
        return new Response("Failed to update user", { status: 500 });
    }
};
