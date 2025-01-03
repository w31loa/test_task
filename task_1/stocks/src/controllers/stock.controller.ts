import { Request, Response } from 'express';
import { StockService } from '../services/stock.service.js';
import { STOCK_CHANGE_ENUM } from '../types/stock-change-enum.js';

export class StockController {
  private stockService: StockService;
  constructor() {
    this.stockService = new StockService();
  }

  async create(req: Request, res: Response){
    const dto = req.body;
    try {
      const data = await this.stockService.create(dto);
      res.json(data).status(200);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to create a stock', error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const dto = req.query;
    try {
      const data = await this.stockService.findAll(dto);
      res.json(data).status(200);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to find all stocks', error: error.message });
    }
  }

  async increase(req: Request, res: Response){
    const { id } = req.params
    const dto = req.body;
    try {
      const data = await this.stockService.changeStock(+id, dto, STOCK_CHANGE_ENUM.INCREASE);
      res.json(data).status(200);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to increase stocks', error: error.message });
    }
  }

  async decrease(req: Request, res: Response){
    const { id } = req.params
    const dto = req.body;
    try {
      const data = await this.stockService.changeStock(+id, dto, STOCK_CHANGE_ENUM.DECREASE);
      res.json(data).status(200);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to decrease stocks', error: error.message });
    }
  }
}
