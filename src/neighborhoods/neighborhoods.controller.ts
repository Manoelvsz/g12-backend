import { Controller, Get, Param, Query } from '@nestjs/common';
import { NeighborhoodsService } from './neighborhoods.service';

@Controller('neighborhoods')
export class NeighborhoodsController {
  constructor(private readonly neighborhoodsService: NeighborhoodsService) {}

  /**
   * GET /neighborhoods
   * Lista todos os bairros
   */
  @Get()
  async getAllNeighborhoods() {
    return this.neighborhoodsService.getAllNeighborhoods();
  }

  /**
   * GET /neighborhoods/:id/cells
   * Retorna todas as células de um bairro específico
   */
  @Get(':id/cells')
  async getCellsByNeighborhood(
    @Param('id') neighborhoodId: string,
    @Query('network') network?: string,
  ) {
    return this.neighborhoodsService.getCellsByNeighborhood(neighborhoodId, network);
  }

  /**
   * GET /neighborhoods/cells/networks
   * Lista redes disponíveis (distinct) para filtro
   */
  @Get('cells/networks')
  async getNetworks() {
    return this.neighborhoodsService.getNetworks();
  }

  /**
   * GET /neighborhoods/:id/points
   * Retorna pontos de coleta de um bairro específico (com coordenadas)
   */
  @Get(':id/points')
  async getPointsByNeighborhood(@Param('id') neighborhoodId: string) {
    return this.neighborhoodsService.getPointsByNeighborhood(neighborhoodId);
  }
}
