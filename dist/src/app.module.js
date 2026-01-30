"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("../prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const admin_module_1 = require("./admin/admin.module");
const supervisor_module_1 = require("./supervisor/supervisor.module");
const pastor_module_1 = require("./pastor/pastor.module");
const lider_module_1 = require("./lider/lider.module");
const membro_module_1 = require("./membro/membro.module");
const visitante_module_1 = require("./visitante/visitante.module");
const posts_module_1 = require("./posts/posts.module");
const neighborhoods_module_1 = require("./neighborhoods/neighborhoods.module");
const cells_module_1 = require("./cells/cells.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            admin_module_1.AdminModule,
            supervisor_module_1.SupervisorModule,
            pastor_module_1.PastorModule,
            lider_module_1.LiderModule,
            membro_module_1.MembroModule,
            visitante_module_1.VisitanteModule,
            posts_module_1.PostsModule,
            neighborhoods_module_1.NeighborhoodsModule,
            cells_module_1.CellsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map