import { z } from 'zod';
import { UserRole } from '../models/user.model';

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        username: z.string().min(3, 'Username must be at least 3 characters long'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        role: z.nativeEnum(UserRole).optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        password: z.string().min(1, 'Password is required'),
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
