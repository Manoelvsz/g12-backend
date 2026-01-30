// src/posts/posts.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * Posts Controller
 * Define os endpoints REST para gerenciar posts institucionais
 */
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * GET /posts
   * Lista todos os posts publicados
   * Ordenados por data de criação descendente
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const posts = await this.postsService.findAll();
    return {
      status: 'success',
      message: 'Posts recuperados com sucesso',
      data: posts,
      count: posts.length,
    };
  }

  /**
   * GET /posts/:id
   * Busca um post específico por ID
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return {
      status: 'success',
      message: 'Post recuperado com sucesso',
      data: post,
    };
  }

  /**
   * POST /posts
   * Cria um novo post
   * Nota: Proteger com @UseGuards(JwtAuthGuard, RolesGuard) no futuro
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);
    return {
      status: 'success',
      message: 'Post criado com sucesso',
      data: post,
    };
  }

  /**
   * PUT /posts/:id
   * Atualiza um post existente
   * Nota: Proteger com @UseGuards(JwtAuthGuard, RolesGuard) no futuro
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postsService.update(id, updatePostDto);
    return {
      status: 'success',
      message: 'Post atualizado com sucesso',
      data: post,
    };
  }

  /**
   * DELETE /posts/:id
   * Deleta um post
   * Nota: Proteger com @UseGuards(JwtAuthGuard, RolesGuard) no futuro
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const post = await this.postsService.remove(id);
    return {
      status: 'success',
      message: 'Post deletado com sucesso',
      data: post,
    };
  }
}
