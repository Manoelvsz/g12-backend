"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPostDto) {
        try {
            const prismaClient = this.prisma;
            const post = await prismaClient.post.create({
                data: {
                    title: createPostDto.title,
                    content: createPostDto.content,
                    imageUrl: createPostDto.imageUrl,
                    published: true,
                },
            });
            console.log(`✅ Post criado com sucesso: ${post.id}`);
            return post;
        }
        catch (error) {
            console.error('❌ Erro ao criar post:', error);
            throw new common_1.InternalServerErrorException('Erro ao criar post');
        }
    }
    async findAll() {
        try {
            const prismaClient = this.prisma;
            const posts = await prismaClient.post.findMany({
                where: {
                    published: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            console.log(`✅ ${posts.length} posts recuperados do banco`);
            return posts;
        }
        catch (error) {
            console.error('❌ Erro ao buscar posts:', error);
            throw new common_1.InternalServerErrorException('Erro ao buscar posts');
        }
    }
    async findOne(id) {
        try {
            const prismaClient = this.prisma;
            const post = await prismaClient.post.findUnique({
                where: { id },
            });
            if (!post) {
                console.warn(`⚠️ Post não encontrado: ${id}`);
                throw new common_1.NotFoundException(`Post com ID "${id}" não encontrado`);
            }
            return post;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('❌ Erro ao buscar post:', error);
            throw new common_1.InternalServerErrorException('Erro ao buscar post');
        }
    }
    async update(id, updatePostDto) {
        try {
            const prismaClient = this.prisma;
            const existingPost = await prismaClient.post.findUnique({
                where: { id },
            });
            if (!existingPost) {
                console.warn(`⚠️ Post não encontrado para atualização: ${id}`);
                throw new common_1.NotFoundException(`Post com ID "${id}" não encontrado`);
            }
            const updatedPost = await prismaClient.post.update({
                where: { id },
                data: {
                    title: updatePostDto.title ?? existingPost.title,
                    content: updatePostDto.content ?? existingPost.content,
                    imageUrl: updatePostDto.imageUrl ?? existingPost.imageUrl,
                },
            });
            console.log(`✅ Post atualizado com sucesso: ${id}`);
            return updatedPost;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('❌ Erro ao atualizar post:', error);
            throw new common_1.InternalServerErrorException('Erro ao atualizar post');
        }
    }
    async remove(id) {
        try {
            const prismaClient = this.prisma;
            const existingPost = await prismaClient.post.findUnique({
                where: { id },
            });
            if (!existingPost) {
                console.warn(`⚠️ Post não encontrado para deleção: ${id}`);
                throw new common_1.NotFoundException(`Post com ID "${id}" não encontrado`);
            }
            const deletedPost = await prismaClient.post.delete({
                where: { id },
            });
            console.log(`✅ Post deletado com sucesso: ${id}`);
            return deletedPost;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('❌ Erro ao deletar post:', error);
            throw new common_1.InternalServerErrorException('Erro ao deletar post');
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map