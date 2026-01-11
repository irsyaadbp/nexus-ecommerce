import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User, { UserRole } from '../models/user.model';
import { connectDB } from './db';

dotenv.config();

const seedUsers = async () => {
    try {
        await connectDB();

        // Clear existing users (optional, but good for clean seed)
        await User.deleteMany({});
        console.log('Cleared existing users');

        const admin = {
            email: 'admin@nexus.com',
            username: 'admin',
            password: 'Password123',
            role: UserRole.ADMIN,
        };

        const customer = {
            email: 'user@nexus.com',
            username: 'customer',
            password: 'Password123',
            role: UserRole.CUSTOMER,
        };

        await User.create(admin);
        console.log('Admin user seeded');

        await User.create(customer);
        console.log('Customer user seeded');

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error: any) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
};

seedUsers();
