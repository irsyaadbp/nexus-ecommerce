import { Router } from 'express';
import * as authController from '../../controllers/admin/auth.controller';
import { validate } from '../../middlewares/validate';
import { loginSchema } from '../../utils/auth.schema';
import { protect, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /admin/login:
 *   post:
 *     tags:
 *       - Admin Auth
 *     summary: Login for admin users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@nexus.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Access denied. Admin only.
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @openapi
 * /admin/me:
 *   get:
 *     tags:
 *       - Admin Auth
 *     summary: Get current admin profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/me', protect, restrictTo('ADMIN'), authController.getMe);

/**
 * @openapi
 * /admin/logout:
 *   post:
 *     tags:
 *       - Admin Auth
 *     summary: Logout admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/logout', protect, restrictTo('ADMIN'), authController.logout);

export default router;
