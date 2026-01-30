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
exports.NeighborhoodsController = void 0;
const common_1 = require("@nestjs/common");
const neighborhoods_service_1 = require("./neighborhoods.service");
let NeighborhoodsController = class NeighborhoodsController {
    neighborhoodsService;
    constructor(neighborhoodsService) {
        this.neighborhoodsService = neighborhoodsService;
    }
    async getAllNeighborhoods() {
        return this.neighborhoodsService.getAllNeighborhoods();
    }
    async getCellsByNeighborhood(neighborhoodId, network) {
        return this.neighborhoodsService.getCellsByNeighborhood(neighborhoodId, network);
    }
    async getNetworks() {
        return this.neighborhoodsService.getNetworks();
    }
    async getPointsByNeighborhood(neighborhoodId) {
        return this.neighborhoodsService.getPointsByNeighborhood(neighborhoodId);
    }
};
exports.NeighborhoodsController = NeighborhoodsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NeighborhoodsController.prototype, "getAllNeighborhoods", null);
__decorate([
    (0, common_1.Get)(':id/cells'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('network')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NeighborhoodsController.prototype, "getCellsByNeighborhood", null);
__decorate([
    (0, common_1.Get)('cells/networks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NeighborhoodsController.prototype, "getNetworks", null);
__decorate([
    (0, common_1.Get)(':id/points'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NeighborhoodsController.prototype, "getPointsByNeighborhood", null);
exports.NeighborhoodsController = NeighborhoodsController = __decorate([
    (0, common_1.Controller)('neighborhoods'),
    __metadata("design:paramtypes", [neighborhoods_service_1.NeighborhoodsService])
], NeighborhoodsController);
//# sourceMappingURL=neighborhoods.controller.js.map