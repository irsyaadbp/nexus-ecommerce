import mongoose, { Schema, Document } from 'mongoose';
import argon2 from 'argon2';

export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role: UserRole;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre<IUser>('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    try {
        this.password = await argon2.hash(this.password);
    } catch (error: any) {
        throw error;
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    try {
        return await argon2.verify(this.password, password);
    } catch (error) {
        return false;
    }
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
