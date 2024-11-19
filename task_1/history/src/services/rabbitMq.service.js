import amqp from 'amqplib';
import HistoryService from './history.service.js';

const historyService = new HistoryService();

export async function listenForHistoryActions() {
  const url = process.env.RABBIT_MQ_URL || 'amqp://localhost';
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    const queue = process.env.QUEUE_NAME || "'history_queue'";
    await channel.prefetch(1);
    await channel.assertQueue(queue, { durable: true });

    console.log('Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());

        console.log('Message get from RabbitMQ:', message);
        await historyService.create(message);
        channel.ack(msg); 
      }
    });
  } catch (error) {
    console.error('Failed to listen for messages:', error);
  }
}
  