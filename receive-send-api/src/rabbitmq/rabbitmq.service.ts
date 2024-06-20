import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private readonly queue = 'messages';

  async sendMessage(message: any) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queue);
    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
    setTimeout(() => {
      connection.close();
    }, 500);
  }

  async getMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queue);

    return new Promise((resolve, reject) => {
      channel.consume(
        this.queue,
        (msg) => {
          if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            channel.ack(msg);
            resolve(message);
          }
        },
        { noAck: false },
      );
    });
  }
}