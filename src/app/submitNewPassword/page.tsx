"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useEffect} from "react";
import toast from "react-hot-toast";


export default function submitNewPassword() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [loading, setLoading] = React.useState(false);

    const resetPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetPassword", user);
            console.log("Successfully resset password", response.data)
            router.push("/login");
            
        } catch (error:any) {
            console.log("Failed to reset password", error.message, user)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Enter new password</h1>
            <label className="mt-3" htmlFor="password">New password</label>
            <input
            className="mt-3 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            placeholder="New password"
            />

            <button 
            onClick={resetPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Submit</button>
        </div>
    )
}