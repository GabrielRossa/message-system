import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CreateMessageDto } from './dto/create-message.dto';
import axios from 'axios';

@Injectable()
export class MessagesService {
  constructor(
    private authService: AuthService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async verifyAndSendMessage(createMessageDto: CreateMessageDto, auth: string) {
    try {
      console.log('Verifying token...');
      const user = await this.authService.verifyToken(auth, createMessageDto.userIdSend);
      if (!user) {
        throw new UnauthorizedException('Invalid token messageservice');
      }
      console.log('Sending message to RabbitMQ...');
      await this.rabbitmqService.sendMessage(createMessageDto);
      console.log('Message sent to RabbitMQ');
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('message not sent');
    }
  }
  

  async getUserMessages(userId: number, auth: string): Promise<any> {
    try {
      const user = await this.authService.verifyToken(auth, userId);
      if (!user) {
        throw new UnauthorizedException('Invalid token messageservice');
      }
      const response = await axios.get(`http://localhost:3002/messages?user=${userId}`);
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('not possibl');
    }
  }
}