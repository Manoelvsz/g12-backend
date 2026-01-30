// src/posts/dto/update-post.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

/**
 * DTO para atualização de posts
 * Todos os campos são opcionais, mas devem ser válidos se fornecidos
 * Estende CreatePostDto com PartialType para reutilizar validações
 */
export class UpdatePostDto extends PartialType(CreatePostDto) {}
