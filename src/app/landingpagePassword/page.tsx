"use client";
import Link from "next/link"; 
import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function resetPassword() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl">Check your email</h1>

        <Link href="/login" onClick={() => console.log("Redirecting back to log in page")}>Go back to login</Link>
        </div>
    )
}