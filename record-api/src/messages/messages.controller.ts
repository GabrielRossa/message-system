import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(
    @Body() messageData: { message: string, userIdSend: number, userIdReceive: number },
  ): Promise<{ ok: boolean }> {
    await this.messagesService.create(messageData);
    return { ok: true };
  }

  @Get()
  async getMessagesByUserId(
    @Query('user') userId: number,
  ): Promise<Message[]> {
    return this.messagesService.findAllByUserId(userId);
  }
}
