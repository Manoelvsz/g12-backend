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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const prisma_service_1 = require("../../prisma/prisma.service");
let RolesController = class RolesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignRole(dto) {
        const roleObj = await this.prisma.role.findUnique({ where: { name: dto.role } });
        if (!roleObj) {
            return { ok: false, message: 'Role não existe' };
        }
        const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
        if (!user) {
            return { ok: false, message: 'Usuário não existe' };
        }
        const already = await this.prisma.userRole.findFirst({ where: { userId: dto.userId, roleId: roleObj.id } });
        if (already) {
            return { ok: true, message: 'Usuário já possui este papel.' };
        }
        await this.prisma.userRole.create({ data: { userId: dto.userId, roleId: roleObj.id } });
        return { ok: true, message: `Usuário promovido a ${dto.role}` };
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)('assign'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "assignRole", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map