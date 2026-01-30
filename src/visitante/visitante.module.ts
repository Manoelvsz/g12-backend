import { Module } from '@nestjs/common';
import { VisitanteController } from './visitante.controller';

@Module({
  controllers: [VisitanteController],
})
export class VisitanteModule {}
