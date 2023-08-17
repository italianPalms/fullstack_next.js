"use client";
import Link from "next/link"; 
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function resetPassword() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl">Reset your password</h1>
        </div>
    )
}