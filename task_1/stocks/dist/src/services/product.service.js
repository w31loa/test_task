import prisma from '../../prisma/prisma-client.js';
import { RabbitMqService } from './rabbitMq.service.js';
import { HISTORY_TARGET_ENUM } from '../types/history-target.enum.js';
import { HISTORY_TYPE_ENUM } from '../types/history-type.enum.js';
export class ProductService {
    rabbitMq;
    constructor() {
        this.rabbitMq = new RabbitMqService();
    }
    async create(dto) {
        const newProduct = await prisma.product.create({
            data: {
                ...dto,
            },
        });
        this.rabbitMq.sendHistoryMessage(newProduct.plu, newProduct, HISTORY_TARGET_ENUM.PRODUCT, HISTORY_TYPE_ENUM.CREATE);
        return newProduct;
    }
    async findAll(dto) {
        return await prisma.product.findMany({
            where: {
                plu: dto.plu,
                name: dto.name,
            },
        });
    }
}
export default new ProductService();
