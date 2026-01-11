import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import { verifyToken } from '../utils/jwt.utils';
import { errorResponse } from '../utils/response';

export interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return errorResponse(res, 'You are not logged in. Please login to get access.', null, 401);
    }

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return errorResponse(res, 'Invalid token. Please login again.', null, 401);
        }

        const currentUser = await User.findById(decoded.id).select('-password');
        if (!currentUser) {
            return errorResponse(res, 'The user belonging to this token no longer exists.', null, 401);
        }

        req.user = currentUser;
        next();
    } catch (error: any) {
        return errorResponse(res, 'Authentication failed', error.message, 401);
    }
};

export const restrictTo = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return errorResponse(res, 'You do not have permission to perform this action', null, 403);
        }
        next();
    };
};
