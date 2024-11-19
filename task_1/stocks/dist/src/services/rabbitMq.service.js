import amqp from 'amqplib';
export class RabbitMqService {
    async sendHistoryMessage(productPlu, payload, target, action, shopId) {
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
        }
        catch (error) {
            console.error('Failed to send message to RabbitMQ:', error);
        }
    }
}
export default new RabbitMqService();
