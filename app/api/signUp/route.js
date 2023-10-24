import { connectToDB } from '@/lib/dbConnect'
import UserModel from '@/models/usermodel'
import bcrypt from 'bcrypt';


export const POST = async (req, res) => {
    const { ...formData } = await req.json();

    console.log(formData);
    try {
        await connectToDB();

        const existingUser = await UserModel.findOne({ email: formData.email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User Already Exists' }), { status: 409 });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(formData.password, saltRounds);
        formData.password = hashedPassword;

        const newUserModel = new UserModel({ ...formData, role: 'user' });

        await newUserModel.save();

        return new Response(JSON.stringify({ message: 'Signed Up Successfully', AccountData: formData }), { status: 201 });

    } catch (err) {
        return new Response("Failed to Sign Up", { status: 500 });
    }
}