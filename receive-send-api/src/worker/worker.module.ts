import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
    imports: [
        RabbitmqModule
    ],
    providers: [
        WorkerService
    ],
    controllers: [
        WorkerController
    ]
})
export class WorkerModule { }