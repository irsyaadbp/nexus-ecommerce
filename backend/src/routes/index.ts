import { Router } from 'express';
import healthRoutes from './health.routes';
import adminAuthRoutes from './admin/auth.routes';
import userAuthRoutes from './user/auth.routes';

const router = Router();

// Mount routes
router.use('/', healthRoutes);

// Admin routes
router.use('/admin', adminAuthRoutes);

// User routes
router.use('/user', userAuthRoutes);

export default router;
