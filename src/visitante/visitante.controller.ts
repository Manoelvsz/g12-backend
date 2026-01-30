import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('visitante')
export class VisitanteController {
  @Post('apenas-visitante')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('visitante')
  somenteLider(@Body() dto: any) {
    return { message: 'Só visitante pode acessar esta rota.' };
  }
}
