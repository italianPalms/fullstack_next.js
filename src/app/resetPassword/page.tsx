"use client";
import Link from "next/link"; 
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function resetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const checkUserExists = async (email: string) => {
        try {
            const response = await axios.post('/api/users/checkUserExist', {email});
            return response.data.exists;

        } catch (error:any) {
            console.log("Failed to check if user exists", error.message)
            return false;
        }
    };

    const sendResetPasswordRequest = async () => {
        try {
            setLoading(true);

            if (!email) {
                toast.error("Please enter your email");
                return;
            }

            const userExists = await checkUserExists(email);

            if (!userExists) {
                toast.error("The user don't exist. Please sign up");
                return; 
            }

            const response = await axios.post('/api/usrs/resetPassword', {email});

            if (response.status === 200) {
                toast.success("Password reset request sent")
            } else {
                toast.error('Password reset request failed')
            }



        } catch (error:any) {
            console.log("Password reset request failed", error.message)
            toast.error(error.message);
            
        } finally {
            setLoading(false);
        }
    }

   
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl">Reset your password</h1>

        <label className="p-2" htmlFor="email">Email</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        placeholder="email"
        />

        <button onClick={() => console.log("Clicked")} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Submit</button>

        <Link href="/login" onClick={() => console.log("Redirecting back to log in page")}>Go back to login</Link>
        </div>
    )
}