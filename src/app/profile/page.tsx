"use client";

import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import UserProfile from "./[id]/page";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            console.log('Logout successful');
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }

    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Welcome</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 mt-3 rounded bg-purple-500">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}
                </Link>}</h2>
            <button
             onClick={logout}
             className="bg-blue-500 mt-4 hover:bg-blue-700 text whie font-bold py-2 px-4 rounded">Logout</button>

            <button
             onClick={getUserDetails}
             className="bg-green-800 mt-4 hover:bg-green-900 text whie font-bold py-2 px-4 rounded">Get user details</button>
             

        </div>
    )
}