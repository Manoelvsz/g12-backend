import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('lider')
export class LiderController {
  @Post('apenas-lider')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('lider')
  somenteLider(@Body() dto: any) {
    return { message: 'Só lider pode acessar esta rota.' };
  }
}
