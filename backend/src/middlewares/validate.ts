import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { errorResponse } from '../utils/response';

export const validate = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors: { [key: string]: string[] } = {};

            error.issues.forEach((issue) => {
                // Path is an array of string | number, usually ["body", "fieldName"]
                const path = issue.path.slice(1).join('.');
                const field = path || 'general';

                if (!formattedErrors[field]) {
                    formattedErrors[field] = [];
                }
                formattedErrors[field].push(issue.message);
            });

            return errorResponse(res, 'Validation failed', formattedErrors, 422);
        }
        return errorResponse(res, 'Internal server error', null, 500);
    }
};
