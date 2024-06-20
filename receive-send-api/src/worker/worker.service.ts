import { Injectable, HttpException } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import axios from 'axios';

@Injectable()
export class WorkerService {
  constructor(private rabbitmqService: RabbitmqService) {}

  async processMessages() {
    try {
      const message = await this.rabbitmqService.getMessage();
      console.log(message)
      if (message) {
        await axios.post('http://localhost:3002/messages', message);
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.response?.data || 'Error processing message', error.response?.status || 500);
    }
  }
}
