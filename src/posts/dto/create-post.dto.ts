// src/posts/dto/create-post.dto.ts

import { IsString, IsOptional, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

/**
 * DTO para criação de posts
 * Validações garantem que os dados sejam corretos antes de chegar ao banco
 */
export class CreatePostDto {
  /**
   * Título do post (opcional)
   * Se fornecido, deve ter entre 3 e 255 caracteres
   */
  @IsOptional()
  @IsString({ message: 'Título deve ser uma string' })
  @MinLength(3, { message: 'Título deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'Título não pode exceder 255 caracteres' })
  title?: string;

  /**
   * Conteúdo do post (obrigatório)
   * Aceita textos longos
   */
  @IsNotEmpty({ message: 'Conteúdo é obrigatório' })
  @IsString({ message: 'Conteúdo deve ser uma string' })
  @MinLength(5, { message: 'Conteúdo deve ter no mínimo 5 caracteres' })
  content: string;

  /**
   * URL da imagem de destaque (opcional)
   * Deve ser uma URL válida se fornecida
   */
  @IsOptional()
  @IsString({ message: 'URL da imagem deve ser uma string' })
  imageUrl?: string;
}
