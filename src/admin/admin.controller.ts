import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
export class AdminController {
  @Post('apenas-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  somenteAdmin(@Body() dto: any) {
    return { message: 'Só admin pode acessar essa rota.' };
  }
}
