import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('membro')
export class MembroController {
  @Post('apenas-membro')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('membro')
  somenteLider(@Body() dto: any) {
    return { message: 'Só membro pode acessar esta rota.' };
  }
}
