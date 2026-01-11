import { Router } from 'express';
import * as authController from '../../controllers/user/auth.controller';
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema } from '../../utils/auth.schema';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Register a new customer
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
 *                 example: user@nexus.com
 *               username:
 *                 type: string
 *                 example: customer_user
 *               password:
 *                 type: string
 *                 example: Password123
 *               role:
 *                 type: string
 *                 enum: [CUSTOMER, ADMIN]
 *                 example: CUSTOMER
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: User already exists
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * @openapi
 * /user/login:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Login for customer users
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
 *                 example: user@nexus.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @openapi
 * /user/me:
 *   get:
 *     tags:
 *       - User Auth
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/me', protect, authController.getMe);

/**
 * @openapi
 * /user/logout:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Logout user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/logout', protect, authController.logout);

export default router;
