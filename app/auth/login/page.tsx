"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login submitted:", { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <Image
                            src="/images/anl-logo.png"
                            alt="Angels and Lemons Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Login Text */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
                    Login
                </h2>

                {/* Login Description */}
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                    Welcome back! Please enter your credentials to access your account.
                </p>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCE861] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCE861] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-[#FCE861] text-[#28523A] font-bold text-base rounded-lg hover:bg-[#f5dc45] hover:text-[#1f3d2b] focus:outline-none focus:ring-2 focus:ring-[#FCE861] focus:ring-offset-2 transition-all shadow-md hover:shadow-lg tracking-wide"
                    >
                        Login
                    </button>

                    {/* Forgot Password Link */}
                    <div className="flex justify-start mt-2">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-gray-700 text-base mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-[#FCE861] hover:text-[#f5dc45] font-bold transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
