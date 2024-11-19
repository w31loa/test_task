import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';
import { FindAllProductsDto } from '../dto/find-all-products.dto.js';

export class ProductController {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  async create(req: Request, res: Response) {
    const dto = req.body;
    try {
      const data = await this.productService.create(dto);
      res.json(data).status(200);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to create a products', error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const dto = req.query;
    try {
      const data = await this.productService.findAll(dto);
      res.json(data).status(200);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to find all products', error: error.message });
    }
  }
}
