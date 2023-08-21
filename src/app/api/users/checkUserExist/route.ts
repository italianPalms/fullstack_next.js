import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        console.log(reqBody);

            if (!email) {
                return NextResponse.json({message: 'Email is required'}, {status: 400});
            } 
        
        const user = await User.findOne({email})
        if (user) {
            console.log("User exist");
            return NextResponse.json({message: 'User exist'}, {status: 200});
        } else {
            console.log("User does not exits");
            return NextResponse.json({message: "User does not exist"}, {status: 404});
        }

    } catch (error:any) {
        console.log("Internal server error")
        return NextResponse.json({ error: error.message }, {status: 500});
    }
}
