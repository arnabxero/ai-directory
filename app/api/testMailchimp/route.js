import { NextResponse } from 'next/server';


export const POST = async (req, res) => {
    const { email } = await req.json();

    const mailchimpInstance = 'us21';
    const listUniqueId = '319792';
    const mailchimpApiKey = process.env.MAILCHIMP_API;


    const mailchimpUrl = `https://${mailchimpInstance}.api.mailchimp.com/3.0/lists/${listUniqueId}/members/`;

    try {

        const headers = {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + mailchimpApiKey,
        };


        const response = await fetch(mailchimpUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({ email_address: email, status: 'subscribed' }),
        });

        if (response.status < 300 || (response.status === 400 && response.body.title === 'Member Exists')) {
            return NextResponse.json({ message: 'Success' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'fail' }, { status: 409 });
        }
    } catch (error) {
        console.error('Mailchimp API Error:', error);
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
};