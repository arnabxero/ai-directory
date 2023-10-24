import { connectToDB } from '@/lib/dbConnect'
import PublicCardModel from '@/models/cardmodelspublic'
import bcrypt from 'bcrypt';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'
import { verifyTokenStrict } from '@/lib/tokenHandler';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {

    try {



        await connectToDB();


        const numCardsToInsert = 400; // Change this to the desired number.

        // Generate an array of card data objects with titles like "card-1", "card-2", etc.
        const cardData = Array.from({ length: numCardsToInsert }, (_, index) => ({
            title: `card-${index + 1}`,
            tags: [`tag-${index + 1}`], // Example: "tag-1", "tag-2"
            summary: `Summary for card ${index + 1}`,
            thumbnail: `thumbnail-url-${index + 1}`,
            siteurl: `site-url-${index + 1}`,
        }));

        await PublicCardModel.insertMany(cardData);


        // const newCardModel = new CardModel({ ...formData });

        // await newCardModel.save();

        return new Response(JSON.stringify({ message: 'Tool Created Successfully' }), { status: 200 });

    } catch (err) {
        return new Response("Failed to Create Card", { status: 500 });
    }
}





// import { connectToDB } from '@/lib/dbConnect';
// import CardModel from '@/models/cardmodel';
// import { NextResponse } from 'next/server';

// export const GET = async (req, res) => {
//     try {
//         // await connectToDB();

//         // // Define the number of cards you want to insert.
//         // const numCardsToInsert = 10; // Change this to the desired number.

//         // // Generate an array of card data objects with titles like "card-1", "card-2", etc.
//         // const cardData = Array.from({ length: numCardsToInsert }, (_, index) => ({
//         //     title: `card-${index + 1}`,
//         //     tags: [`tag-${index + 1}`], // Example: "tag-1", "tag-2"
//         //     summary: `Summary for card ${index + 1}`,
//         //     thumbnail: `thumbnail-url-${index + 1}`,
//         //     siteurl: `site-url-${index + 1}`,
//         // }));

//         // // Insert the bulk data into the database using the CardModel.
//         // await CardModel.insertMany(cardData);

//         return new NextResponse.JSON({ message: 'Bulk Insert Successful' }, { status: 200 });
//     } catch (err) {
//         return new NextResponse.JSON({ message: 'Failed to Insert Bulk Data', error: err.message }, { status: 500 });
//     }
// };
