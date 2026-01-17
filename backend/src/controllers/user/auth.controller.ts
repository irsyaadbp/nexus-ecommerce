import { Request, Response } from 'express';
import User from '../../models/user.model';
import { successResponse, errorResponse } from '../../utils/response';
import { signToken } from '../../utils/jwt.utils';
import { RegisterInput, LoginInput } from '../../utils/auth.schema';
import { AuthRequest } from '../../middlewares/auth.middleware';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, username, password, role }: RegisterInput = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return errorResponse(res, 'Email already exists', null, 400);
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return errorResponse(res, 'Username already exists', null, 400);
        }

        const user = await User.create({
            email,
            username,
            password,
            role: role || 'CUSTOMER',
        });

        const token = signToken({ id: user._id, role: user.role });

        return successResponse(res, 'User registered successfully', {
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        }, 201);
    } catch (error: any) {
        return errorResponse(res, 'Registration failed', error.message, 500);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginInput = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, 'Invalid credentials', null, 401);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 'Invalid credentials', null, 401);
        }

        const token = signToken({ id: user._id, role: user.role });

        return successResponse(res, 'User logged in successfully', {
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error: any) {
        return errorResponse(res, 'User login failed', error.message, 500);
    }
};

export const getMe = async (req: AuthRequest, res: Response) => {
    return successResponse(res, 'User profile retrieved successfully', req.user);
};

export const logout = async (req: AuthRequest, res: Response) => {
    return successResponse(res, 'User logged out successfully', null);
};
