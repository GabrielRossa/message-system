import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, RabbitmqModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
