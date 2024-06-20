import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest_user',
      password: 'password',
      database: 'messages_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MessagesModule,
  ],
})
export class AppModule {}
