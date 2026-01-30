// src/posts/posts.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

/**
 * Posts Module
 * Módulo responsável pela gestão de posts institucionais
 * Agrupa controllers, services e dependências relacionadas
 */
@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService], // Exporta o service para outros módulos utilizarem se necessário
})
export class PostsModule {}
