import ProductRoutes from './product.router.js';
import StockRoutes from './stock.router.js';
import { Router } from 'express';

const router = Router();

router.use('/api/product', ProductRoutes);
router.use('/api/stock', StockRoutes)

export default router;
