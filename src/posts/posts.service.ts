// src/posts/posts.service.ts

import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * Posts Service
 * Responsável pela lógica de negócio relacionada a posts institucionais
 */
@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo post
   * @param createPostDto - Dados do post a ser criado
   * @returns Post criado
   * @throws InternalServerErrorException - Erro ao criar post
   */
  async create(createPostDto: CreatePostDto) {
    try {
      const prismaClient = this.prisma as unknown as PrismaClient;
      const post = await (prismaClient.post as any).create({
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          imageUrl: createPostDto.imageUrl,
          published: true,
        },
      });

      console.log(`✅ Post criado com sucesso: ${post.id}`);
      return post;
    } catch (error) {
      console.error('❌ Erro ao criar post:', error);
      throw new InternalServerErrorException('Erro ao criar post');
    }
  }

  /**
   * Busca todos os posts publicados
   * Ordenados por data de criação descendente (mais recentes primeiro)
   * @returns Lista de posts publicados
   */
  async findAll() {
    try {
      const prismaClient = this.prisma as unknown as PrismaClient;
      const posts = await (prismaClient.post as any).findMany({
        where: {
          published: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      console.log(`✅ ${posts.length} posts recuperados do banco`);
      return posts;
    } catch (error) {
      console.error('❌ Erro ao buscar posts:', error);
      throw new InternalServerErrorException('Erro ao buscar posts');
    }
  }

  /**
   * Busca um post específico por ID
   * @param id - ID do post
   * @returns Post encontrado
   * @throws NotFoundException - Se post não existir
   */
  async findOne(id: string) {
    try {
      const prismaClient = this.prisma as unknown as PrismaClient;
      const post = await (prismaClient.post as any).findUnique({
        where: { id },
      });

      if (!post) {
        console.warn(`⚠️ Post não encontrado: ${id}`);
        throw new NotFoundException(`Post com ID "${id}" não encontrado`);
      }

      return post;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('❌ Erro ao buscar post:', error);
      throw new InternalServerErrorException('Erro ao buscar post');
    }
  }

  /**
   * Atualiza um post existente
   * @param id - ID do post
   * @param updatePostDto - Dados a atualizar
   * @returns Post atualizado
   * @throws NotFoundException - Se post não existir
   */
  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const prismaClient = this.prisma as unknown as PrismaClient;
      
      const existingPost = await (prismaClient.post as any).findUnique({
        where: { id },
      });

      if (!existingPost) {
        console.warn(`⚠️ Post não encontrado para atualização: ${id}`);
        throw new NotFoundException(`Post com ID "${id}" não encontrado`);
      }

      const updatedPost = await (prismaClient.post as any).update({
        where: { id },
        data: {
          title: updatePostDto.title ?? existingPost.title,
          content: updatePostDto.content ?? existingPost.content,
          imageUrl: updatePostDto.imageUrl ?? existingPost.imageUrl,
        },
      });

      console.log(`✅ Post atualizado com sucesso: ${id}`);
      return updatedPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('❌ Erro ao atualizar post:', error);
      throw new InternalServerErrorException('Erro ao atualizar post');
    }
  }

  /**
   * Deleta um post existente
   * @param id - ID do post a deletar
   * @returns Post deletado
   * @throws NotFoundException - Se post não existir
   */
  async remove(id: string) {
    try {
      const prismaClient = this.prisma as unknown as PrismaClient;
      
      const existingPost = await (prismaClient.post as any).findUnique({
        where: { id },
      });

      if (!existingPost) {
        console.warn(`⚠️ Post não encontrado para deleção: ${id}`);
        throw new NotFoundException(`Post com ID "${id}" não encontrado`);
      }

      const deletedPost = await (prismaClient.post as any).delete({
        where: { id },
      });

      console.log(`✅ Post deletado com sucesso: ${id}`);
      return deletedPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('❌ Erro ao deletar post:', error);
      throw new InternalServerErrorException('Erro ao deletar post');
    }
  }
}
