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
exports.NeighborhoodsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
let NeighborhoodsService = class NeighborhoodsService {
    configService;
    supabase;
    constructor(configService) {
        this.configService = configService;
        const supabaseUrl = this.configService.get('SUPABASE_URL') || '';
        const supabaseKey = this.configService.get('SUPABASE_KEY') || '';
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('SUPABASE_URL e SUPABASE_KEY devem estar configurados no .env');
        }
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    async getAllNeighborhoods() {
        try {
            const { data, error } = await this.supabase
                .from('neighborhoods')
                .select('id, name, city, state, created_at');
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            throw new Error(`Erro ao buscar bairros: ${error.message}`);
        }
    }
    async getCellsByNeighborhood(neighborhoodId, network) {
        try {
            let query = this.supabase
                .from('cells')
                .select('id, name, neighborhood_id, address, latitude, longitude, created_at, leader, generation, network')
                .eq('neighborhood_id', neighborhoodId);
            if (network) {
                query = query.eq('network', network);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            throw new Error(`Erro ao buscar células: ${error.message}`);
        }
    }
    async getNetworks() {
        return ['Homem', 'Mulher', 'Kingdom', 'DTX'];
    }
    async getPointsByNeighborhood(neighborhoodId) {
        try {
            const { data: neighborhood, error: neighError } = await this.supabase
                .from('neighborhoods')
                .select('id, name, latitude, longitude')
                .eq('id', neighborhoodId)
                .single();
            if (neighError)
                throw neighError;
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
        }
        catch (error) {
            throw new Error(`Erro ao buscar pontos de coleta: ${error.message}`);
        }
    }
};
exports.NeighborhoodsService = NeighborhoodsService;
exports.NeighborhoodsService = NeighborhoodsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NeighborhoodsService);
//# sourceMappingURL=neighborhoods.service.js.map