import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private readonly queue = 'messages';

  async sendMessage(message: any) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queue);
    console.log('Sending message to queue:', this.queue);
    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
    console.log('Message sent to queue');
    setTimeout(() => {
      connection.close();
    }, 500);
  }

  async getMessages(): Promise<any[]> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queue);
  
    const messages = [];
  
    const consumeMessage = async () => {
      const msg = await channel.get(this.queue, { noAck: false });
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log('Message consumed:', message);
        channel.ack(msg);
        messages.push(message);
        await consumeMessage();
      }
    };
  
    await consumeMessage();
    await channel.close();
    await connection.close();
  
    return messages;
  }
  
}