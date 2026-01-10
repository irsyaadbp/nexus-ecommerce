import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { successResponse } from '../utils/response';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check and DB status
 *     description: Returns the uptime, current time, and MongoDB connection status.
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                     mongo_status:
 *                       type: string
 *                       enum: [connected, disconnected]
 */
export const getHealth = (req: Request, res: Response) => {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const data = {
        uptime: process.uptime(),
        timestamp: new Date(),
        mongo_status: mongoStatus,
    };
    return successResponse(res, 'OK', data);
};
