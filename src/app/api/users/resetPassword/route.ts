import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})

        if (user) {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt);
            await User.updateOne({email}, {password: hashedPassword});

            // const newPassword = ({
            //     username, 
            //     email, 
            //     password: hashedPassword
            // })

            console.log("New password successfully set")
            return NextResponse.json({message: "Password reset seccussful"});
        }
        
    } catch (error:any) {
        console.log("Failed to reset password", error.message)
        return NextResponse.json({error: error.message}, 
            {status:500})
    }
}