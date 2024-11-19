import prisma from '../../prisma/prisma.client.js';

export class HistoryService {
  async create({ action, target, productPlu, shopId, payload }) {
    const newHistoryAction = await prisma.historyAction.create({
      data: {
        action,
        target,
        productPlu,
        shopId,
        payload: JSON.stringify(payload),
      },
    });
    return newHistoryAction;
  }

  async findAll(plu, shop_id, date_from, date_to, action) {
    const parsedPLU = plu ? plu : undefined;
    const parsedShopId = shop_id ? +shop_id : undefined;
    const parsedDateFrom = date_from ? new Date(date_from) : undefined;
    const parsedDateTo = date_to ? new Date(date_to) : undefined;

    const parsedAction = action ? action : undefined;
    return await prisma.historyAction.findMany({
      where: {
        productPlu: parsedPLU,
        action: parsedAction,
        shopId: parsedShopId,
        timestamp:
          parsedDateFrom && parsedDateTo
            ? {
                gt: parsedDateFrom,
                lt: parsedDateTo,
              }
            : undefined,
      },
    });
  }
}

export default HistoryService;
