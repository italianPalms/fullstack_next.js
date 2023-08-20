import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

connect();

export default async function handler(request: NextRequest) {
    if (request.method !== 'POST') {
        return NextResponse.json({message: "Method not allowed"}, {status: 405
        });
    }

    

    try {

        const requestBody = await request.json();
        const {email} = requestBody;
            if (!email) {
                return NextResponse.json({message: 'Email is required'}, {status: 400});
            } 
        
        const results = await query('SELECT * FROM users WHERE email = ?', [email]);
        const userExists = results.length > 0;
        
        return NextResponse.json({exists: userExists});
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ message: 'Internal server error' }, {status: 500});
    }
    
}

function query(arg0: string, arg1: any[]) {
    throw new Error('Function not implemented.');
}
