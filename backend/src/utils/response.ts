import { Response } from 'express';

type ErrorData = {
    [key: string]: string[];
};

export const successResponse = (res: Response, message: string, data: any = null, code: number = 200) => {
    return res.status(code).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res: Response, message: string, errors: ErrorData | null = null, code: number = 400) => {
    return res.status(code).json({
        success: false,
        message,
        error: errors,
    });
};
