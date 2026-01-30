import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('pastor')
export class PastorController {
  @Post('apenas-pastor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('pastor')
  somenteLider(@Body() dto: any) {
    return { message: 'Só pastor pode acessar esta rota.' };
  }
}
