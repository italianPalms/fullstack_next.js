"use client";
import Link from "next/link";


export default function submitNewPassword() {
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
            onClick={() => console.log("New password button clicked")}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Submit</button>
        </div>
    )
}