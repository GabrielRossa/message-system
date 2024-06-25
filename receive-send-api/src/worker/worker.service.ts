import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import axios from 'axios';

@Injectable()
export class WorkerService {
  constructor(private rabbitmqService: RabbitmqService) {}

  async processMessages() {
    try {
      console.log('Fetching messages from RabbitMQ...');
      const messages = await this.rabbitmqService.getMessages();
      console.log('Messages fetched:', messages);

      if (!messages || messages.length === 0){
        throw new HttpException('A fila está vazia', HttpStatus.BAD_REQUEST)
      }
  
      for (const message of messages) {

        console.log('Sending message to external service:', message);
        await axios.post('http://localhost:3002/messages', message);
        console.log('Message sent to external service');
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.response?.data || 'Error processing messages', error.response?.status || 500);
    }
  }
  
}
