import { Router } from 'express';
import * as productController from '../../controllers/admin/product.controller';
import { validate } from '../../middlewares/validate';
import { createProductSchema, updateProductSchema, getProductsQuerySchema } from '../../utils/product.schema';

const router = Router();

/**
 * @openapi
 * /admin/products:
 *   get:
 *     tags:
 *       - Admin Product
 *     summary: List all products with pagination and filter
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
 * /admin/products/categories:
 *   get:
 *     tags:
 *       - Admin Product
 *     summary: Get list of unique product categories
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/categories', productController.getCategories);

/**
 * @openapi
 * /admin/products:
 *   post:
 *     tags:
 *       - Admin Product
 *     summary: Create a new product
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', validate(createProductSchema), productController.createProduct);

/**
 * @openapi
 * /admin/products/{slug}:
 *   get:
 *     tags:
 *       - Admin Product
 *     summary: Get product by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:slug', productController.getProductBySlug);

/**
 * @openapi
 * /admin/products/{id}:
 *   put:
 *     tags:
 *       - Admin Product
 *     summary: Update product
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
router.put('/:id', validate(updateProductSchema), productController.updateProduct);

/**
 * @openapi
 * /admin/products/{id}:
 *   delete:
 *     tags:
 *       - Admin Product
 *     summary: Delete product
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
router.delete('/:id', productController.deleteProduct);

export default router;
