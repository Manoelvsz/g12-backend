// src/roles/roles.controller.ts
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PrismaService } from 'prisma/prisma.service';

@Controller('roles')
export class RolesController {
  constructor(private prisma: PrismaService) {}

  @Post('assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async assignRole(@Body() dto: { userId: string; role: string }) {
    // Verificar se role existe
    const roleObj = await this.prisma.role.findUnique({ where: { name: dto.role } });
    if (!roleObj) {
      return { ok: false, message: 'Role não existe' };
    }
    // Verificar se usuário existe
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) {
      return { ok: false, message: 'Usuário não existe' };
    }
    // Verificar se usuário já tem esta role
    const already = await this.prisma.userRole.findFirst({ where: { userId: dto.userId, roleId: roleObj.id } });
    if (already) {
      return { ok: true, message: 'Usuário já possui este papel.' };
    }
    // Criar associação
    await this.prisma.userRole.create({ data: { userId: dto.userId, roleId: roleObj.id } });
    return { ok: true, message: `Usuário promovido a ${dto.role}` };
  }
}
