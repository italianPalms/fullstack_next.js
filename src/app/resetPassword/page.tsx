"use client";
import Link from "next/link"; 
import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function resetPassword() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const checkUserExists = async () => {
        try {
            if (!email) {
            console.log("Please enter your email");
            toast.error("Please enter your email");
            return;
            }

            setLoading(true);

            const response = await axios.post("/api/users/checkUserExist", {email})
            router.push("/landingpagePassword");
            
            console.log("User exist", response.data);
        
        } catch (error:any) {
            console.log("User don't exist. Please sign up", error.message)
            router.push("/signup")
            toast.error(error.message);
        
        } finally {
            setLoading(false)
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <button 
        onClick={() => {
            // console.log("Submit button clicked");
            checkUserExists();
        }}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Submit</button>

        <Link href="/login" onClick={() => console.log("Redirecting back to log in page")}>Go back to login</Link>
        </div>
    )
}