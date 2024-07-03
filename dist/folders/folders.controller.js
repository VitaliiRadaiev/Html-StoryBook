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
exports.FoldersController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const validateProperties_middleware_1 = require("../common/validateProperties.middleware");
const folders_repository_1 = require("./folders.repository");
const path_1 = require("path");
const fs_1 = require("fs");
let FoldersController = class FoldersController extends base_controller_1.BaseController {
    constructor(foldersRepository) {
        super();
        this.foldersRepository = foldersRepository;
        this.bindRoutes([
            { path: '/', method: 'post', func: this.createFolder,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'title',
                        'workspaceId',
                        'folderId'
                    ], true)
                ]
            },
            { path: '/:id', method: 'put', func: this.updateFolder,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'title',
                        'order',
                        'folderId',
                        'workspaceId'
                    ], true)
                ]
            },
            { path: '/:id', method: 'delete', func: this.deleteFolder,
                middlewares: []
            },
            { path: '/:id', method: 'get', func: this.getFolderById,
                middlewares: []
            },
        ]);
    }
    getFolderById(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const id = params.id;
                const folder = yield this.foldersRepository.getFolderById(id);
                if (!folder) {
                    this.error(res, 404, 'Folder has not found');
                    return;
                }
                else {
                    this.ok(res, folder);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    createFolder(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                const folder = yield this.foldersRepository.createFolder(body);
                if (folder) {
                    this.ok(res, folder);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    updateFolder(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body, params }, res, next) {
            try {
                const id = params.id;
                const folder = yield this.foldersRepository.getFolderById(id);
                if (!folder) {
                    this.error(res, 404, 'Folder has not found');
                    return;
                }
                const updated = yield this.foldersRepository.updateFolder(id, body);
                if (updated) {
                    this.ok(res, updated);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    deleteFolder(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const id = params.id;
                const folder = yield this.foldersRepository.getFolderById(id);
                if (!folder) {
                    this.error(res, 404, 'Folder has not found');
                    return;
                }
                const directComponents = folder.components;
                const folders = folder.folders;
                const collectComponentsFromFolders = (folders) => __awaiter(this, void 0, void 0, function* () {
                    let components = [];
                    for (const folder of folders) {
                        const nestedFolder = yield this.foldersRepository.getFolderById(folder.id);
                        if (nestedFolder) {
                            components = components.concat(nestedFolder.components);
                            if (nestedFolder.folders.length > 0) {
                                const nestedComponents = yield collectComponentsFromFolders(nestedFolder.folders);
                                components = components.concat(nestedComponents);
                            }
                        }
                    }
                    return components;
                });
                const nestedComponents = yield collectComponentsFromFolders(folders);
                const allComponents = [...directComponents, ...nestedComponents];
                const deleted = yield this.foldersRepository.deleteFolder(id);
                if (deleted) {
                    this.ok(res, deleted);
                    for (const component of allComponents) {
                        const folderPath = (0, path_1.join)('./public/files/', `component_${component.id}_files`);
                        if ((0, fs_1.existsSync)(folderPath)) {
                            (0, fs_1.rm)(folderPath, { recursive: true, force: true }, (err) => {
                                if (err)
                                    console.log(err);
                            });
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
};
exports.FoldersController = FoldersController;
exports.FoldersController = FoldersController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.FoldersRepository)),
    __metadata("design:paramtypes", [folders_repository_1.FoldersRepository])
], FoldersController);
//# sourceMappingURL=folders.controller.js.map