import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    termsAccepted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            match: [/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            match: [/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
        },
        termsAccepted: {
            type: Boolean,
            required: [true, "You must accept the terms and conditions"],
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
