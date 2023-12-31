"use client";
import Link from "next/link"; 
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import resetPassword from "../resetPassword/page";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "", 
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("Login successful", response.data);
            toast.success("Login succcess")
            router.push("/profile")

        } catch (error:any) {
            console.log("Login failed. Check your email or password.", error.message);
            toast.error(error.message);
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const resetPassword = async () => {
        router.push('/resetPassword')
        console.log("Directing to reset password page")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">{loading ? "Processing" : "Login"}</h1>
            <hr />

            <label className="mt-2" htmlFor="email">email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black mt-2"
            id="email" 
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />

            <label htmlFor="password">password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black mt-2"
            id="password" 
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"

            />
            <button 
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-2">Login</button>
            
            <button
            onClick={resetPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-2">Forgot your password</button>

            <Link href="/signup">Not registered? Sign up here</Link>
        </div>
    )
}