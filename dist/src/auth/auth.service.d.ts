import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            roles: string[];
            phone: string | null;
            birthDate: string | undefined;
            address: string | null;
            avatar: string | null;
            createdAt: string;
            updatedAt: string;
        };
        token: string;
    }>;
    register(data: {
        name: string;
        email: string;
        password: string;
        phone?: string;
    }): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            roles: string[];
            phone: string | null;
            birthDate: string | undefined;
            address: string | null;
            avatar: string | null;
            createdAt: string;
            updatedAt: string;
        };
        token: string;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        roles: string[];
        phone: string | null;
        birthDate: string | undefined;
        address: string | null;
        avatar: string | null;
        createdAt: string;
        updatedAt: string;
    }>;
    updateProfile(userId: string, data: {
        name?: string;
        email?: string;
        phone?: string;
        birthDate?: string;
        address?: string;
        avatar?: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        roles: string[];
        phone: string | null;
        birthDate: string | undefined;
        address: string | null;
        avatar: string | null;
        createdAt: string;
        updatedAt: string;
    }>;
}
