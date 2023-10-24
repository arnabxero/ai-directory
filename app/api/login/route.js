import { connectToDB } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import UserModel from '@/models/usermodel'
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/tokenHandler';

export const POST = async (req, res) => {
    const { email, password } = await req.json();

    try {
        await connectToDB();

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {

            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                const existingUserObject = existingUser.toObject();
                delete existingUserObject.password;

                // if (existingUserObject.verified !== 'verified') {
                //     existingUserObject.verified = 'unverified';
                // }

                const signed_token = generateToken(existingUserObject);

                return NextResponse.json({ message: 'Login Successful', token: signed_token }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Wrong Email or Password' }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } catch (err) {
        return NextResponse.json({ message: 'An Error Occurred' }, { status: 500 });
    }
};
