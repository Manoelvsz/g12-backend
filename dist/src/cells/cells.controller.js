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
exports.CellsController = void 0;
const common_1 = require("@nestjs/common");
const cells_service_1 = require("./cells.service");
const create_cell_request_dto_1 = require("./dto/create-cell-request.dto");
const update_cell_dto_1 = require("./dto/update-cell.dto");
const reject_request_dto_1 = require("./dto/reject-request.dto");
let CellsController = class CellsController {
    cellsService;
    constructor(cellsService) {
        this.cellsService = cellsService;
    }
    async createRequest(dto) {
        const data = await this.cellsService.createRequest(dto);
        return { status: 'success', message: 'Solicitação registrada', data };
    }
    async listRequests(status) {
        const data = await this.cellsService.listRequests(status);
        return { status: 'success', message: 'Solicitações listadas', data, count: data.length };
    }
    async approveRequest(id) {
        const data = await this.cellsService.approveRequest(id);
        return { status: 'success', message: 'Solicitação aprovada e célula criada', data };
    }
    async rejectRequest(id, dto) {
        const data = await this.cellsService.rejectRequest(id, dto);
        return { status: 'success', message: 'Solicitação rejeitada', data };
    }
    async listCells() {
        const data = await this.cellsService.listCells();
        return { status: 'success', message: 'Células listadas', data, count: data.length };
    }
    async getCell(id) {
        const data = await this.cellsService.getCell(id);
        return { status: 'success', message: 'Célula encontrada', data };
    }
    async updateCell(id, dto) {
        const data = await this.cellsService.updateCell(id, dto);
        return { status: 'success', message: 'Célula atualizada', data };
    }
    async deleteCell(id) {
        const data = await this.cellsService.deleteCell(id);
        return { status: 'success', message: 'Célula removida', data };
    }
};
exports.CellsController = CellsController;
__decorate([
    (0, common_1.Post)('requests'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cell_request_dto_1.CreateCellRequestDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)('requests'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "listRequests", null);
__decorate([
    (0, common_1.Post)('requests/:id/approve'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "approveRequest", null);
__decorate([
    (0, common_1.Post)('requests/:id/reject'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reject_request_dto_1.RejectRequestDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "listCells", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "getCell", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cell_dto_1.UpdateCellDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "updateCell", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "deleteCell", null);
exports.CellsController = CellsController = __decorate([
    (0, common_1.Controller)('cells'),
    __metadata("design:paramtypes", [cells_service_1.CellsService])
], CellsController);
//# sourceMappingURL=cells.controller.js.map