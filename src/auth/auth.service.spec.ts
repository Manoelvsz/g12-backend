import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  /**
   * Registro de novo usuário
   * Recebe dados, cria usuário, atribui role inicial 'visitante', e retorna user + JWT
   */
  async register(data: RegisterDto) {
    // Verificar se email já existe
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new ConflictException('Email já cadastrado.');
    }
    // Hash da senha
    const hashed = await bcrypt.hash(data.password, 10);
    // Cria usuário
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        phone: data.phone,
      },
    });
    // Role inicial: visitante
    const visitanteRole = await this.prisma.role.findUnique({ where: { name: 'visitante' } });
    if (visitanteRole) {
      await this.prisma.userRole.create({ data: { userId: user.id, roleId: visitanteRole.id } });
    }
    // Retorna já logado
    return this.login(data.email, data.password);
  }

  /**
   * Login: valida email/senha, retorna user + JWT
   */
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: { include: { role: true } },
      },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    const roles = user.userRoles.map(ur => ur.role.name);
    const payload = { sub: user.id, email: user.email, roles };
    const token = this.jwtService.sign(payload);
    // Retornar user simplificado + token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      token,
    };
  }

  /**
   * Perfil de usuário autenticado
   */
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: { include: { role: true } },
      },
    });
    if (!user) throw new UnauthorizedException('Usuário não localizado.');
    const roles = user.userRoles.map(ur => ur.role.name);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
