import { Controller, Post } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller('message/worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  async processMessages() {
    await this.workerService.processMessages();
    return { message: 'messages processed' };
  }
}