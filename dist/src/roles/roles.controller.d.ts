import { PrismaService } from 'prisma/prisma.service';
export declare class RolesController {
    private prisma;
    constructor(prisma: PrismaService);
    assignRole(dto: {
        userId: string;
        role: string;
    }): Promise<{
        ok: boolean;
        message: string;
    }>;
}
