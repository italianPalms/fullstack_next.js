"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import toast from "react-hot-toast";


export default function SubmitNewPassword() {

    const router = useRouter();
  
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const resetPassword = async () => {

        try {

            if (!email) {
                console.log("Please enter your email");
                return;
            }

            if (!password) {
                console.log("Please enter your new password");
                return;
            }

            setLoading(true);
            const response = await axios.post("/api/users/resetPassword", {
                email: email,
                password: password
            });
            console.log("Successfully resset password", response.data)
            router.push("/login");
            
        } catch (error:any) {
            console.log("Password reset failed", error.message)
            toast.error(error.message);
         } finally {
            setLoading(false);
         }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Enter new password</h1>
            <label className="mt-2" htmlFor="email">Email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black mt-2"
            id="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label className="mt-3" htmlFor="password">New password</label>
            <input
            className="mt-3 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black mt-2"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            />

            <button 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-2"
            onClick={resetPassword}
            disabled={loading} > 
            {loading ? "Resetting..." : "Reset Password"}
            </button>

            <Link href="/login" onClick={() => console.log("Redirecting back to log in page")}>Go back to login</Link>
        </div>
    )
}