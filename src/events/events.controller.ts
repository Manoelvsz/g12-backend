// src/events/events.controller.ts
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('events')
export class EventsController {
  @Post('criar-evento')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'supervisor', 'pastor')
  criarEvento(@Body() dto: any) {
    return { message: 'Só admin, supervisor ou pastor acessam.' };
  }
}
