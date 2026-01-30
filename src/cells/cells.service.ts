import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCellRequestDto } from './dto/create-cell-request.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { RejectRequestDto } from './dto/reject-request.dto';

@Injectable()
export class CellsService {
  constructor(private readonly prisma: PrismaService) {}

  async listCells() {
    return this.prisma.cells.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async getCell(id: string) {
    const cell = await this.prisma.cells.findUnique({ where: { id } });
    if (!cell) {
      throw new NotFoundException('Célula não encontrada');
    }
    return cell;
  }

  async updateCell(id: string, dto: UpdateCellDto) {
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

  async deleteCell(id: string) {
    await this.getCell(id);
    return this.prisma.cells.delete({ where: { id } });
  }

  async createRequest(dto: CreateCellRequestDto) {
    if (!dto.neighborhoodId) {
      throw new BadRequestException('Bairro é obrigatório para solicitar nova célula');
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

  async listRequests(status?: string) {
    return this.prisma.cellRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: { created_at: 'desc' },
    });
  }

  async approveRequest(id: string) {
    const request = await this.prisma.cellRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    if (request.status !== 'pending') {
      throw new BadRequestException('Solicitação já processada');
    }
    if (!request.neighborhood_id) {
      throw new BadRequestException('Solicitação precisa de bairro para aprovar');
    }
    const neighborhoodId = request.neighborhood_id as string;

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

  async rejectRequest(id: string, dto: RejectRequestDto) {
    const request = await this.prisma.cellRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    if (request.status !== 'pending') {
      throw new BadRequestException('Solicitação já processada');
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
}
