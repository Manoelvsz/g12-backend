import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class NeighborhoodsService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') || '';
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL e SUPABASE_KEY devem estar configurados no .env');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Busca todos os bairros
   */
  async getAllNeighborhoods() {
    try {
      const { data, error } = await this.supabase
        .from('neighborhoods')
        .select('id, name, city, state, created_at');

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erro ao buscar bairros: ${error.message}`);
    }
  }

  /**
   * Busca células de um bairro específico
   */
  async getCellsByNeighborhood(neighborhoodId: string, network?: string) {
    try {
      let query = this.supabase
        .from('cells')
        .select('id, name, neighborhood_id, address, latitude, longitude, created_at, leader, generation, network')
        .eq('neighborhood_id', neighborhoodId);

      if (network) {
        query = query.eq('network', network);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erro ao buscar células: ${error.message}`);
    }
  }

  /**
   * Busca lista de redes disponíveis (distinct)
   */
  async getNetworks() {
    // Lista fixa definida pela liderança
    return ['Homem', 'Mulher', 'Kingdom', 'DTX'];
  }

  /**
   * Busca pontos de coleta de um bairro específico
   * Retorna apenas pontos que têm coordenadas (latitude/longitude)
   */
  async getPointsByNeighborhood(neighborhoodId: string) {
    try {
      const { data: neighborhood, error: neighError } = await this.supabase
        .from('neighborhoods')
        .select('id, name, latitude, longitude')
        .eq('id', neighborhoodId)
        .single();

      if (neighError) throw neighError;

      const { data: points, error: pointsError } = await this.supabase
        .from('collection_points')
        .select('id, name, address, latitude, longitude, neighborhood_id, created_at')
        .eq('neighborhood_id', neighborhoodId)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

      if (pointsError && pointsError.code !== 'PGRST116') {
        throw pointsError;
      }

      return {
        neighborhood: neighborhood || { id: neighborhoodId, name: 'Bairro Desconhecido' },
        points: points || [],
      };
    } catch (error) {
      throw new Error(`Erro ao buscar pontos de coleta: ${error.message}`);
    }
  }
}
