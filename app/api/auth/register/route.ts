import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import User from "@/app/lib/models/User";

// Simple password hashing (for production, use bcrypt)
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectDB();

        const body = await request.json();
        const { firstName, lastName, email, password, termsAccepted } = body;

        // Validate input
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate terms acceptance
        if (!termsAccepted) {
            return NextResponse.json(
                { error: "You must accept the terms and conditions" },
                { status: 400 }
            );
        }

        // Validate name format (letters and spaces only)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(firstName)) {
            return NextResponse.json(
                { error: "First name can only contain letters and spaces" },
                { status: 400 }
            );
        }
        if (!nameRegex.test(lastName)) {
            return NextResponse.json(
                { error: "Last name can only contain letters and spaces" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: "An account with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            termsAccepted,
        });

        // Return success response (exclude password from response)
        return NextResponse.json(
            {
                message: "Registration successful",
                user: {
                    id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);

        // Handle mongoose validation errors
        if (error instanceof Error && error.name === "ValidationError") {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
