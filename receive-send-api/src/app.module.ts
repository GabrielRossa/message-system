import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { MessagesModule } from './messages/messages.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    RabbitmqModule,
    MessagesModule,
    WorkerModule,
  ]
})
export class AppModule {}
