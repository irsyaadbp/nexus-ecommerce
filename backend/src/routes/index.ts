import { Router } from 'express';
import healthRoutes from './health.routes';
import adminAuthRoutes from './admin/auth.routes';
import adminProductRoutes from './admin/product.routes';
import userAuthRoutes from './user/auth.routes';
import userProductRoutes from './user/product.routes';

const router = Router();

// Mount routes
router.use('/', healthRoutes);

// Admin routes
router.use('/admin', adminAuthRoutes);
router.use('/admin/products', adminProductRoutes);

// User routes
router.use('/user', userAuthRoutes);
router.use('/user/products', userProductRoutes);

export default router;
