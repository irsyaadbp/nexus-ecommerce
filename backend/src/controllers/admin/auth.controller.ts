import { Request, Response } from 'express';
import User from '../../models/user.model';
import { successResponse, errorResponse } from '../../utils/response';
import { signToken } from '../../utils/jwt.utils';
import { LoginInput } from '../../utils/auth.schema';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginInput = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, 'Invalid credentials', null, 401);
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 'Invalid credentials', null, 401);
        }

        // Check if admin
        if (user.role !== 'ADMIN') {
            return errorResponse(res, 'Access denied. Admin only.', null, 403);
        }

        const token = signToken({ id: user._id, role: user.role });

        return successResponse(res, 'Admin logged in successfully', {
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error: any) {
        return errorResponse(res, 'Login failed', error.message, 500);
    }
};
