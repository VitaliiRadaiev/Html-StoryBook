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
exports.WorkSpaceController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const validateProperties_middleware_1 = require("../common/validateProperties.middleware");
const path_1 = require("path");
const fs_1 = require("fs");
const work_space_repository_1 = require("./work-space.repository");
const folders_repository_1 = require("../folders/folders.repository");
let WorkSpaceController = class WorkSpaceController extends base_controller_1.BaseController {
    constructor(workSpaceRepository, foldersRepository) {
        super();
        this.workSpaceRepository = workSpaceRepository;
        this.foldersRepository = foldersRepository;
        this.bindRoutes([
            {
                path: '/', method: 'get', func: this.getWorkSpaces,
                middlewares: []
            },
            {
                path: '/:id', method: 'get', func: this.getWorkSpaceById,
                middlewares: []
            },
            {
                path: '/', method: 'post', func: this.createWorkSpace,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'title'
                    ])
                ]
            },
            {
                path: '/:id', method: 'put', func: this.updateWorkSpace,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'title',
                        'order',
                        'scss',
                        'js'
                    ], true)
                ]
            },
            {
                path: '/:id', method: 'delete', func: this.deleteWorkSpace,
                middlewares: []
            },
            {
                path: '/:id/link', method: 'put', func: this.createLink,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'url',
                        'workspaceCssId',
                        'workspaceJsId'
                    ], true)
                ]
            },
        ]);
    }
    getWorkSpaces(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workSpaces = yield this.workSpaceRepository.getWorkSpaces();
                if (workSpaces) {
                    this.ok(res, workSpaces);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    getWorkSpaceById(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const { id } = params;
                const workSpace = yield this.workSpaceRepository.getWorkSpaceById(id);
                if (!workSpace) {
                    this.error(res, 404, 'Work Space has not found');
                    return;
                }
                this.ok(res, workSpace);
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    createWorkSpace(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                const workSpace = yield this.workSpaceRepository.createWorkSpace(body);
                if (workSpace) {
                    const folderPath = (0, path_1.join)('./public/files/', `work-space_${workSpace.id}_files`);
                    if (!(0, fs_1.existsSync)(folderPath)) {
                        (0, fs_1.mkdirSync)(folderPath);
                    }
                    this.ok(res, workSpace);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    updateWorkSpace(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body, params }, res, next) {
            try {
                const { id } = params;
                const workSpace = yield this.workSpaceRepository.getWorkSpaceById(id);
                if (!workSpace) {
                    this.error(res, 404, 'Work Space has not found');
                    return;
                }
                const updated = yield this.workSpaceRepository.updateWorkSpace(id, body);
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
    deleteWorkSpace(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const { id } = params;
                const workSpace = yield this.workSpaceRepository.getWorkSpaceById(id);
                if (!workSpace) {
                    this.error(res, 404, 'Work Space has not found');
                    return;
                }
                const directComponents = workSpace.components;
                const folders = workSpace.folders;
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
                const deleted = yield this.workSpaceRepository.deleteWorkSpace(id);
                if (deleted) {
                    this.ok(res, deleted);
                    const folderPath = (0, path_1.join)('./public/files/', `work-space_${deleted.id}_files`);
                    if ((0, fs_1.existsSync)(folderPath)) {
                        (0, fs_1.rm)(folderPath, { recursive: true, force: true }, (err) => {
                            if (err)
                                console.log(err);
                        });
                    }
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
    createLink(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params, body }, res, next) {
            try {
                const { id } = params;
                const workSpace = yield this.workSpaceRepository.getWorkSpaceById(id);
                if (!workSpace) {
                    this.error(res, 404, 'Work Space has not found');
                    return;
                }
                const link = yield this.workSpaceRepository.createLink(id, body);
                if (link) {
                    this.ok(res, link);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
};
exports.WorkSpaceController = WorkSpaceController;
exports.WorkSpaceController = WorkSpaceController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.WorkSpaceRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.FoldersRepository)),
    __metadata("design:paramtypes", [work_space_repository_1.WorkSpaceRepository,
        folders_repository_1.FoldersRepository])
], WorkSpaceController);
//# sourceMappingURL=work-space.controller.js.map