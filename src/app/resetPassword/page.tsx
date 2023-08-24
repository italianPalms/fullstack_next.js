"use client";
import Link from "next/link"; 
import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function resetPassword() {

    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const checkUserExists = async () => {
        try {
            if (!email) {
            console.log("Please enter your email");
            toast.error("Please enter your email");
            return;
            }

            setLoading(true);

            const response = await axios.post("/api/users/checkUserExist", {email})
            router.push("/submitNewPassword");
            
            console.log("User exist", response.data);
        
        } catch (error:any) {
            console.log("User don't exist. Please sign up", error.message)
            // router.push("/signup")
            toast.error(error.message);
        
        } finally {
            setLoading(false)
        }
    }
    

    // const [email, setEmail] = useState("");
    // const [loading, setLoading] = useState(false);

    // const checkUserExists = async (email: string) => {
    //     try {
    //         const response = await axios.post('/api/users/checkUserExist', {email});
    //         console.log(response.data);
    //         return response.data.exists;
            

    //     } catch (error:any) {
    //         // console.log("Failed to check if user exists", error.message)
    //         console.log("The user don't exist. Please sign up", error.message)
    //         return false;
    //     }
    // };

    // const sendResetPasswordRequest = async () => {
    //     try {
    //         setLoading(true);

    //         if (!email) {
    //             console.log("Please enter your email");
    //             toast.error("Please enter your email");
    //             return;
    //         }

    //         const userExists = await checkUserExists(email);

    //         // if (!userExists) {
    //         //     console.log("The user don't exist. Please sign up");
    //         //     toast.error("The user don't exist. Please sign up");
    //         //     return; 
    //         // }

    //         const response = await axios.post('/api/users/resetPassword', {email});

    //         if (response.status === 200) {
    //             console.log("Password reset request sent");
    //             toast.success("Password reset request sent")
    //         } else {
    //             toast.error('Password reset request failed')
    //         }

    //     } catch (error:any) {
    //         console.log("Password reset request failed", error.message)
    //         toast.error(error.message);
            
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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