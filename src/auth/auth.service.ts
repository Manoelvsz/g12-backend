// src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Login: busca usuário, valida senha e retorna JWT com roles
   */
  async login(email: string, password: string) {
    // Buscar usuário com roles
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Validar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Extrair roles do usuário
    const roles = user.userRoles.map((ur) => ur.role.name);

    // Gerar JWT com roles
    const payload = {
      sub: user.id,
      email: user.email,
      roles, // 🔥 Incluir roles no token
    };

    const token = this.jwtService.sign(payload);

    // Retornar dados do usuário e token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles, // 🔥 Enviar roles para o frontend
        phone: user.phone,
        birthDate: user.birthDate?.toISOString(),
        address: user.address,
        avatar: user.avatar,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      token,
    };
  }

  /**
   * Registro: cria novo usuário com role padrão 'visitante'
   */
  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    // Verificar se email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
      },
    });

    // Atribuir role padrão 'membro' (nível 2)
    const membroRole = await this.prisma.role.findUnique({
      where: { name: 'membro' },
    });

    if (membroRole) {
      await this.prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: membroRole.id,
        },
      });
    }

    // Fazer login automático
    return this.login(user.email, data.password);
  }

  /**
   * Buscar perfil do usuário autenticado
   */
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const roles = user.userRoles.map((ur) => ur.role.name);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles,
      phone: user.phone,
      birthDate: user.birthDate?.toISOString(),
      address: user.address,
      avatar: user.avatar,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  /**
   * ✅ NOVO: Atualizar perfil do usuário autenticado
   */
  async updateProfile(
    userId: string,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      birthDate?: string;
      address?: string;
      avatar?: string;
    },
  ) {
    // Se está atualizando o email, verificar se não está em uso
    if (data.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Email já está em uso');
      }
    }

    // Atualizar usuário
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.birthDate !== undefined && {
          birthDate: data.birthDate ? new Date(data.birthDate) : null,
        }),
        ...(data.address !== undefined && { address: data.address }),
        ...(data.avatar !== undefined && { avatar: data.avatar }),
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    const roles = updatedUser.userRoles.map((ur) => ur.role.name);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      roles,
      phone: updatedUser.phone,
      birthDate: updatedUser.birthDate?.toISOString(),
      address: updatedUser.address,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString(),
    };
  }
}
