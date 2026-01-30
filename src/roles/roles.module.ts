import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Permite o uso do PrismaService
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
