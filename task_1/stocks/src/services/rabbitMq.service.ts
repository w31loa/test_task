import amqp from 'amqplib';
import { HISTORY_TARGET_ENUM } from 'types/history-target.enum.js';
import { HISTORY_TYPE_ENUM } from 'types/history-type.enum.js';

export class RabbitMqService {
  async sendHistoryMessage(
    productPlu: string,
    payload,
    target: HISTORY_TARGET_ENUM,
    action: HISTORY_TYPE_ENUM,
    shopId?: number,
  ) {
    const url = process.env.RABBIT_MQ_URL || 'amqp://localhost';
    try {
      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();
      const queue = process.env.QUEUE_NAME || "'history_queue'";

      await channel.assertQueue(queue, { durable: true });

      const message = {
        action,
        target,
        productPlu,
        shopId,
        payload,
      };

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true,
      });

      console.log('Message sent to RabbitMQ:', message);

      setTimeout(() => {
        connection.close();
      }, 500);
    } catch (error) {
      console.error('Failed to send message to RabbitMQ:', error);
    }
  }
}

export default new RabbitMqService();
