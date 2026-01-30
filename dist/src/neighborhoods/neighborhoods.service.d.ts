import { ConfigService } from '@nestjs/config';
export declare class NeighborhoodsService {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    getAllNeighborhoods(): Promise<{
        id: any;
        name: any;
        city: any;
        state: any;
        created_at: any;
    }[]>;
    getCellsByNeighborhood(neighborhoodId: string, network?: string): Promise<{
        id: any;
        name: any;
        neighborhood_id: any;
        address: any;
        latitude: any;
        longitude: any;
        created_at: any;
        leader: any;
        generation: any;
        network: any;
    }[]>;
    getNetworks(): Promise<string[]>;
    getPointsByNeighborhood(neighborhoodId: string): Promise<{
        neighborhood: {
            id: any;
            name: any;
            latitude: any;
            longitude: any;
        };
        points: {
            id: any;
            name: any;
            address: any;
            latitude: any;
            longitude: any;
            neighborhood_id: any;
            created_at: any;
        }[];
    }>;
}
