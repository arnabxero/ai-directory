import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
    const { email } = await req.json();

    try {
        // Your MailerLite API key
        const apiKey = process.env.MAILERLITE_API;
        // The MailerLite API endpoint for adding subscribers
        const apiEndpoint = 'https://connect.mailerlite.com/api/subscribers';

        // Define the data to send to MailerLite
        const data = {
            email,
        };

        const headers = {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + apiKey,
        };

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        console.log(responseData)

        if (response.ok) {
            // Subscriber added successfully
            return NextResponse.json({ message: 'Success' }, { status: 200 });
        } else {
            // Error occurred when adding the subscriber
            return NextResponse.json({ message: 'An Error Occurred' }, { status: 500 });
        }
    } catch (err) {
        // Handle any exceptions
        console.error(err);
        return NextResponse.json({ message: 'An Error Occurred' }, { status: 500 });
    }
};
