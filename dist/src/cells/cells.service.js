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
exports.CellsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CellsService = class CellsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listCells() {
        return this.prisma.cells.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
    async getCell(id) {
        const cell = await this.prisma.cells.findUnique({ where: { id } });
        if (!cell) {
            throw new common_1.NotFoundException('Célula não encontrada');
        }
        return cell;
    }
    async updateCell(id, dto) {
        await this.getCell(id);
        return this.prisma.cells.update({
            where: { id },
            data: {
                name: dto.name,
                neighborhood_id: dto.neighborhood_id,
                cep: dto.cep,
                address: dto.address,
                leader: dto.leader,
                generation: dto.generation,
                network: dto.network,
                latitude: dto.latitude,
                longitude: dto.longitude,
            },
        });
    }
    async deleteCell(id) {
        await this.getCell(id);
        return this.prisma.cells.delete({ where: { id } });
    }
    async createRequest(dto) {
        if (!dto.neighborhoodId) {
            throw new common_1.BadRequestException('Bairro é obrigatório para solicitar nova célula');
        }
        return this.prisma.cellRequest.create({
            data: {
                cep: dto.cep,
                address: dto.address,
                name: dto.name,
                latitude: dto.latitude,
                longitude: dto.longitude,
                neighborhood_id: dto.neighborhoodId,
                network: dto.network,
                notes: dto.notes,
                status: 'pending',
            },
        });
    }
    async listRequests(status) {
        return this.prisma.cellRequest.findMany({
            where: status ? { status } : undefined,
            orderBy: { created_at: 'desc' },
        });
    }
    async approveRequest(id) {
        const request = await this.prisma.cellRequest.findUnique({ where: { id } });
        if (!request) {
            throw new common_1.NotFoundException('Solicitação não encontrada');
        }
        if (request.status !== 'pending') {
            throw new common_1.BadRequestException('Solicitação já processada');
        }
        if (!request.neighborhood_id) {
            throw new common_1.BadRequestException('Solicitação precisa de bairro para aprovar');
        }
        const neighborhoodId = request.neighborhood_id;
        return this.prisma.$transaction(async (tx) => {
            const cell = await tx.cells.create({
                data: {
                    name: request.name ?? `Célula ${request.cep}`,
                    neighborhood_id: neighborhoodId,
                    cep: request.cep,
                    address: request.address ?? null,
                    network: request.network ?? null,
                    latitude: request.latitude,
                    longitude: request.longitude,
                },
            });
            await tx.cellRequest.update({
                where: { id },
                data: { status: 'approved', updated_at: new Date() },
            });
            return { requestId: id, cell };
        });
    }
    async rejectRequest(id, dto) {
        const request = await this.prisma.cellRequest.findUnique({ where: { id } });
        if (!request) {
            throw new common_1.NotFoundException('Solicitação não encontrada');
        }
        if (request.status !== 'pending') {
            throw new common_1.BadRequestException('Solicitação já processada');
        }
        return this.prisma.cellRequest.update({
            where: { id },
            data: {
                status: 'rejected',
                notes: dto.reason ?? request.notes,
                updated_at: new Date(),
            },
        });
    }
};
exports.CellsService = CellsService;
exports.CellsService = CellsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CellsService);
//# sourceMappingURL=cells.service.js.map