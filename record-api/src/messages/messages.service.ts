import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(messageData: { message: string, userIdSend: number, userIdReceive: number }): Promise<void> {
    const message = new Message();
    message.message = messageData.message;
    message.userIdSend = messageData.userIdSend;
    message.userIdReceive = messageData.userIdReceive;
    await this.messagesRepository.save(message);
  }
  
  async findAllByUserId(userId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      where: [{ userIdSend: userId }, { userIdReceive: userId }],
    });
  }
}
