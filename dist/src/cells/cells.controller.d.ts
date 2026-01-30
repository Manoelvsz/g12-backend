import { CellsService } from './cells.service';
import { CreateCellRequestDto } from './dto/create-cell-request.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { RejectRequestDto } from './dto/reject-request.dto';
export declare class CellsController {
    private readonly cellsService;
    constructor(cellsService: CellsService);
    createRequest(dto: CreateCellRequestDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string | null;
            address: string | null;
            created_at: Date | null;
            neighborhood_id: string | null;
            latitude: import("@prisma/client/runtime/library").Decimal;
            longitude: import("@prisma/client/runtime/library").Decimal;
            network: string | null;
            cep: string;
            notes: string | null;
            updated_at: Date | null;
            status: string;
        };
    }>;
    listRequests(status?: string): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string | null;
            address: string | null;
            created_at: Date | null;
            neighborhood_id: string | null;
            latitude: import("@prisma/client/runtime/library").Decimal;
            longitude: import("@prisma/client/runtime/library").Decimal;
            network: string | null;
            cep: string;
            notes: string | null;
            updated_at: Date | null;
            status: string;
        }[];
        count: number;
    }>;
    approveRequest(id: string): Promise<{
        status: string;
        message: string;
        data: {
            requestId: string;
            cell: {
                id: string;
                name: string;
                address: string | null;
                created_at: Date | null;
                neighborhood_id: string;
                latitude: import("@prisma/client/runtime/library").Decimal | null;
                longitude: import("@prisma/client/runtime/library").Decimal | null;
                leader: string | null;
                generation: string | null;
                network: string | null;
                cep: string | null;
                updated_at: Date | null;
            };
        };
    }>;
    rejectRequest(id: string, dto: RejectRequestDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string | null;
            address: string | null;
            created_at: Date | null;
            neighborhood_id: string | null;
            latitude: import("@prisma/client/runtime/library").Decimal;
            longitude: import("@prisma/client/runtime/library").Decimal;
            network: string | null;
            cep: string;
            notes: string | null;
            updated_at: Date | null;
            status: string;
        };
    }>;
    listCells(): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            address: string | null;
            created_at: Date | null;
            neighborhood_id: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            leader: string | null;
            generation: string | null;
            network: string | null;
            cep: string | null;
            updated_at: Date | null;
        }[];
        count: number;
    }>;
    getCell(id: string): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            address: string | null;
            created_at: Date | null;
            neighborhood_id: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            leader: string | null;
            generation: string | null;
            network: string | null;
            cep: string | null;
            updated_at: Date | null;
        };
    }>;
    updateCell(id: string, dto: UpdateCellDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            address: string | null;
            created_at: Date | null;
            neighborhood_id: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            leader: string | null;
            generation: string | null;
            network: string | null;
            cep: string | null;
            updated_at: Date | null;
        };
    }>;
    deleteCell(id: string): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            address: string | null;
            created_at: Date | null;
            neighborhood_id: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            leader: string | null;
            generation: string | null;
            network: string | null;
            cep: string | null;
            updated_at: Date | null;
        };
    }>;
}
