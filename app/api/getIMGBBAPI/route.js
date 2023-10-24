import { connectToDB } from '@/lib/dbConnect'
import CardModel from '@/models/cardmodel'
import { NextResponse } from 'next/server'

export const GET = async (req, res) => {

    try {
        return NextResponse.json({ message: 'API Key got successfully', API: process.env.IMG_BB_API_KEY }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: 'API Key Failed' }, { status: 500 });
    }
}

export const revalidate = 1;