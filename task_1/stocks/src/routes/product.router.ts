import { validateDto } from '../middleware/validationMiddleware.js';
import { ProductController } from '../controllers/product.controller.js';
import { Router } from 'express';
import { FindAllProductsDto } from '../dto/find-all-products.dto.js';
import { CreateProductDto } from '../dto/create-product.dto.js';

const router = Router();
const productController = new ProductController();

router.get('/find-all',
    validateDto(FindAllProductsDto, 'query'),
    productController.findAll.bind(productController));

router.post('/create',
    validateDto(CreateProductDto, 'body'),
    productController.create.bind(productController));

export default router;
