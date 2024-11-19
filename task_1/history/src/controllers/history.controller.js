import HistoryService from '../services/history.service.js'

export class HistoryController {
  constructor() {
    this.historyService = new HistoryService();
  }

  async create(req, res) {
    const { action, target, productPlu, shopId, payload } = req.body;

    try {
      const newHistoryAction = await this.historyService.createHistoryAction({
        action,
        target,
        productPlu,
        shopId,
        payload,
      });
      res.status(201).json(newHistoryAction); // Возвращаем созданный объект
    } catch (error) {
      res.status(500).json({
        message: 'Failed to create history action',
        error: error.message,
      });
    }
  }

  async findAll(req, res) {
    const dto = req.query;
    try {
      const data = await this.historyService.findAll(dto.plu, dto.shop_id, dto.date_from, dto.date_to, dto.action);
      res.json(data).status(200);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to find all products', error: error.message });
    }
  }
}
