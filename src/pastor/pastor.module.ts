import { Module } from '@nestjs/common';
import { PastorController } from './pastor.controller';

@Module({
  controllers: [PastorController],
})
export class PastorModule {}
