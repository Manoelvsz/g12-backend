import { Module } from '@nestjs/common';
import { SupervisorController } from './supervisor.controller';

@Module({
  controllers: [SupervisorController],
})
export class SupervisorModule {}
