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
      const user = await this.authService.verifyToken(auth, createMessageDto.userIdSend);
      if (!user) {
        throw new UnauthorizedException('Invalid token messageservice');
      }
      await this.rabbitmqService.sendMessage(createMessageDto);
    } catch (error) {
        console.log(error)
      throw new HttpException(error.response?.data || 'Error sending message', error.response?.status || 500);
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
      throw new Error('Failed to retrieve messages');
    }
  }
}