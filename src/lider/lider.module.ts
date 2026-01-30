import { Module } from '@nestjs/common';
import { LiderController } from './lider.controller';

@Module({
  controllers: [LiderController],
})
export class LiderModule {}
