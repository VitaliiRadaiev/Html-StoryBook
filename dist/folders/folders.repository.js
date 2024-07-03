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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const prisma_service_1 = require("../database/prisma.service");
let FoldersRepository = class FoldersRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getFolderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.client.folderModel.findFirst({
                where: { id },
                include: {
                    folders: true,
                    components: true,
                }
            });
        });
    }
    createFolder(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, workspaceId, folderId, }) {
            const count = yield this.prismaService.client.folderModel.count();
            return yield this.prismaService.client.folderModel.create({
                data: {
                    title,
                    workspaceId,
                    folderId,
                    order: count
                }
            });
        });
    }
    updateFolder(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.client.folderModel.update({
                where: { id },
                data: {
                    title: body.title,
                    order: body.order,
                    folderId: body.folderId,
                    workspaceId: body.workspaceId
                }
            });
        });
    }
    deleteFolder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.client.folderModel.delete({
                where: { id }
            });
        });
    }
};
exports.FoldersRepository = FoldersRepository;
exports.FoldersRepository = FoldersRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FoldersRepository);
//# sourceMappingURL=folders.repository.js.map