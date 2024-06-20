import { Body, Controller, Get, Headers, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Headers('Authorization') auth: string,
  ) {
    await this.messagesService.verifyAndSendMessage(createMessageDto, auth);
    return { message: 'message sent with success' };
  }
  
  @Get('/read')
  async readMessages(
    @Headers('Authorization') auth: string,
    @Query('user') userId: number,
  ) {
    const messages = await this.messagesService.getUserMessages(userId, auth);
    return { messages };
  }
}