import { Module } from '@nestjs/common';
import { MembroController } from './membro.controller';

@Module({
  controllers: [MembroController],
})
export class MembroModule {}
