import { connectToDB } from '@/lib/dbConnect'
import PublicCardModel from '@/models/cardmodelspublic'
import bcrypt from 'bcrypt';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'
import { verifyTokenStrict } from '@/lib/tokenHandler';
import jwt from 'jsonwebtoken';

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

        await connectToDB();

        const newCardModel = new PublicCardModel({ ...formData });

        await newCardModel.save();

        return new Response(JSON.stringify({ message: 'Tool Submitted Successfully', CardData: formData }), { status: 200 });

    } catch (err) {
        return new Response("Failed to Submit Card", { status: 500 });
    }
}