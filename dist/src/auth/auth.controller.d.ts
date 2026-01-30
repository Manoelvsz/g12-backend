import { AuthService } from './auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateProfileDto } from '../auth/dto/update-profile.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
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
    register(registerDto: RegisterDto): Promise<{
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
    getProfile(req: any): Promise<{
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
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<{
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
    logout(): Promise<{
        message: string;
    }>;
}
