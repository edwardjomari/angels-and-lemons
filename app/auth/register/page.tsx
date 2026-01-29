"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (!termsAccepted) {
            setError("Please accept the terms and conditions to continue.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    termsAccepted,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Registration failed. Please try again.");
                return;
            }

            // Registration successful - redirect to login
            alert("Registration successful! Please login.");
            router.push("/auth/login");
        } catch (err) {
            console.error("Registration error:", err);
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
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

                {/* Register Text */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
                    Create Account
                </h2>

                {/* Register Description */}
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                    Join Angels & Lemons! Fill in your details to get started.
                </p>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Fields - Two Columns */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name Field */}
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-semibold text-gray-800 mb-2"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCE861] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        {/* Last Name Field */}
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-semibold text-gray-800 mb-2"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCE861] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    </div>

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

                    {/* Password Fields - Two Columns */}
                    <div className="grid grid-cols-2 gap-4">
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

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-semibold text-gray-800 mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCE861] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            We want you to know exactly how our service works and what it means for you. Please confirm that you have read, understood, and accept the <span className="font-bold">terms and conditions</span>.
                        </p>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                required
                                className="h-4 w-4 text-[#FCE861] focus:ring-[#FCE861] border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="termsAccepted"
                                className="ml-3 text-sm text-gray-800 cursor-pointer"
                            >
                                I have read, understood, and accept the <span className="font-bold">terms and conditions</span>
                            </label>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-[#FCE861] text-[#28523A] font-bold text-base rounded-lg hover:bg-[#f5dc45] hover:text-[#1f3d2b] focus:outline-none focus:ring-2 focus:ring-[#FCE861] focus:ring-offset-2 transition-all shadow-md hover:shadow-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-gray-700 text-base mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-[#FCE861] hover:text-[#f5dc45] font-bold transition-colors"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
