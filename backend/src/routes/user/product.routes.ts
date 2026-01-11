import { Router } from 'express';
import * as productController from '../../controllers/user/product.controller';
import { validate } from '../../middlewares/validate';
import { getProductsQuerySchema } from '../../utils/product.schema';

const router = Router();

/**
 * @openapi
 * /user/products:
 *   get:
 *     tags:
 *       - User Product
 *     summary: List products with pagination and filtering
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', validate(getProductsQuerySchema), productController.getProducts);

/**
 * @openapi
 * /user/products/categories:
 *   get:
 *     tags:
 *       - User Product
 *     summary: Get list of unique product categories
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/categories', productController.getCategories);

/**
 * @openapi
 * /user/products/{id}:
 *   get:
 *     tags:
 *       - User Product
 *     summary: Get product details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', productController.getProductById);

export default router;
