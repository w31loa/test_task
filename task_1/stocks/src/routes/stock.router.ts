import { validateDto } from '../middleware/validationMiddleware.js';
import { Router } from 'express';
import { StockController } from '../controllers/stock.controller.js';
import { FindAllStocksDto } from '../dto/find-all-stocks.dto.js';
import { CreateStockDto } from '../dto/create-stock.dto.js';
import { UpdateStockDto } from '../dto/update-stock.dto.js';

const router = Router();
const stockController = new StockController();

router.get('/find-all',
    validateDto(FindAllStocksDto, 'query'),
    stockController.findAll.bind(stockController));

router.post('/create',
    validateDto(CreateStockDto, 'body'),
    stockController.create.bind(stockController));

router.patch('/increase/:id',
    validateDto(UpdateStockDto, 'body'),
    stockController.increase.bind(stockController));

router.patch('/decrease/:id',
    validateDto(UpdateStockDto, 'body'),
    stockController.decrease.bind(stockController));

export default router;
