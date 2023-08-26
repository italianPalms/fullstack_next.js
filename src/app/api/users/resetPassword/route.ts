import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log("Request body:", reqBody)

    
    const user = await User.findOne({email})
    console.log("User found:", user);

        if (user) {
            console.log("User found", user);
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            user.password = hashedPassword;
            await user.save();

            return NextResponse.json({
                message: 'Password reset successfully',
                success: true,
            });
    } else {
        console.log("Email dont exist");
        return NextResponse.json({
            message: "Email doesn't exist",
            success: false, 
            status: 404
        });
    }
    } catch (error:any) {
        console.log("Failed to reset password", error.message)
        return NextResponse.json({error: error.message}, 
            {status:500})
    }
}