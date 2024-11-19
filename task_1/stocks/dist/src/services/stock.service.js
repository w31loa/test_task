import prisma from '../../prisma/prisma-client.js';
import { STOCK_CHANGE_ENUM } from '../types/stock-change-enum.js';
import { RabbitMqService } from './rabbitMq.service.js';
import { HISTORY_TARGET_ENUM } from '../types/history-target.enum.js';
import { HISTORY_TYPE_ENUM } from '../types/history-type.enum.js';
export class StockService {
    rabbitMq;
    constructor() {
        this.rabbitMq = new RabbitMqService();
    }
    async create(dto) {
        const newStock = await prisma.stock.create({
            data: {
                ...dto,
            },
            include: {
                Product: true,
            },
        });
        this.rabbitMq.sendHistoryMessage(newStock.Product.plu, newStock, HISTORY_TARGET_ENUM.STOCK, HISTORY_TYPE_ENUM.CREATE, newStock.shop_id);
        return newStock;
    }
    async findAll(dto) {
        return await prisma.stock.findMany({
            where: {
                Product: {
                    plu: dto.plu,
                },
                Shop: {
                    id: dto.shop_id ? +dto.shop_id : undefined,
                },
                quantity_on_shelf: dto.quantity_on_shelf &&
                    dto.quantity_on_shelf.from &&
                    dto.quantity_on_shelf.to
                    ? {
                        gt: +dto.quantity_on_shelf.from,
                        lt: +dto.quantity_on_shelf.to,
                    }
                    : undefined,
                quantity_in_order: dto.quantity_on_order &&
                    dto.quantity_on_order.from &&
                    dto.quantity_on_order.to
                    ? {
                        gt: +dto.quantity_on_order.from,
                        lt: +dto.quantity_on_order.to,
                    }
                    : undefined,
            },
        });
    }
    async changeStock(id, dto, type) {
        const receivedStock = await prisma.stock.findUnique({
            where: { id },
            include: {
                Product: true,
            },
        });
        if (!receivedStock) {
            throw new Error('Cant find stock');
        }
        const updatedQuantity = {
            quantity_in_order: type == STOCK_CHANGE_ENUM.INCREASE
                ? receivedStock.quantity_in_order + dto.quantity_in_order
                : receivedStock.quantity_in_order - dto.quantity_in_order,
            quantity_on_shelf: type == STOCK_CHANGE_ENUM.INCREASE
                ? receivedStock.quantity_on_shelf + dto.quantity_on_shelf
                : receivedStock.quantity_on_shelf - dto.quantity_on_shelf,
        };
        const updatedStock = await prisma.stock.update({
            where: {
                id,
            },
            data: {
                quantity_in_order: updatedQuantity.quantity_in_order >= 0
                    ? updatedQuantity.quantity_in_order
                    : 0,
                quantity_on_shelf: updatedQuantity.quantity_on_shelf >= 0
                    ? updatedQuantity.quantity_on_shelf
                    : 0,
            },
        });
        this.rabbitMq.sendHistoryMessage(receivedStock.Product.plu, updatedStock, HISTORY_TARGET_ENUM.STOCK, HISTORY_TYPE_ENUM.UPDATE, updatedStock.shop_id);
        return updatedStock;
    }
}
export default new StockService();
