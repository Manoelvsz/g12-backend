import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('supervisor')
export class SupervisorController {
  @Post('apenas-supervisor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('supervisor')
  somenteSupervisor(@Body() dto: any) {
    return { message: 'Só supervisor pode acessar esta rota.' };
  }
}
