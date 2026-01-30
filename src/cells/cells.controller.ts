import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CreateCellRequestDto } from './dto/create-cell-request.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { RejectRequestDto } from './dto/reject-request.dto';

@Controller('cells')
export class CellsController {
  constructor(private readonly cellsService: CellsService) {}

  // Solicitações de criação (definidas antes das rotas com :id para evitar conflito)
  @Post('requests')
  async createRequest(@Body(ValidationPipe) dto: CreateCellRequestDto) {
    const data = await this.cellsService.createRequest(dto);
    return { status: 'success', message: 'Solicitação registrada', data };
  }

  @Get('requests')
  async listRequests(@Query('status') status?: string) {
    const data = await this.cellsService.listRequests(status);
    return { status: 'success', message: 'Solicitações listadas', data, count: data.length };
  }

  @Post('requests/:id/approve')
  async approveRequest(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.cellsService.approveRequest(id);
    return { status: 'success', message: 'Solicitação aprovada e célula criada', data };
  }

  @Post('requests/:id/reject')
  async rejectRequest(@Param('id', new ParseUUIDPipe()) id: string, @Body(ValidationPipe) dto: RejectRequestDto) {
    const data = await this.cellsService.rejectRequest(id, dto);
    return { status: 'success', message: 'Solicitação rejeitada', data };
  }

  // CRUD simples de células (admin)
  @Get()
  async listCells() {
    const data = await this.cellsService.listCells();
    return { status: 'success', message: 'Células listadas', data, count: data.length };
  }

  @Get(':id')
  async getCell(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.cellsService.getCell(id);
    return { status: 'success', message: 'Célula encontrada', data };
  }

  @Put(':id')
  async updateCell(@Param('id', new ParseUUIDPipe()) id: string, @Body(ValidationPipe) dto: UpdateCellDto) {
    const data = await this.cellsService.updateCell(id, dto);
    return { status: 'success', message: 'Célula atualizada', data };
  }

  @Delete(':id')
  async deleteCell(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.cellsService.deleteCell(id);
    return { status: 'success', message: 'Célula removida', data };
  }
}
