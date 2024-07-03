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
exports.FilesController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const validateProperties_middleware_1 = require("../common/validateProperties.middleware");
const path_1 = require("path");
const fs_1 = require("fs");
const files_repository_1 = require("./files.repository");
let FilesController = class FilesController extends base_controller_1.BaseController {
    constructor(filesRepository) {
        super();
        this.filesRepository = filesRepository;
        this.bindRoutes([
            {
                path: '/', method: 'post', func: this.createFiles,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'workspaceId',
                        'componentId'
                    ], true)
                ]
            },
            {
                path: '/:id', method: 'delete', func: this.deleteFile,
                middlewares: []
            },
        ]);
    }
    createFiles(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body, files: filesData }, res, next) {
            try {
                const folderPath = (body.componentId && (0, path_1.join)('./public/files/', `component_${body.componentId}_files`))
                    || (body.workspaceId && (0, path_1.join)('./public/files/', `work-space_${body.workspaceId}_files`))
                    || '';
                if ((0, fs_1.existsSync)(folderPath) && filesData) {
                    const files = Array.isArray(filesData.files) ? filesData.files : [filesData.files];
                    const loadedFiles = [];
                    for (const file of files) {
                        const uploadPath = (0, path_1.join)(__dirname, '..', '..', folderPath, file.name);
                        const isFileLoaded = yield new Promise(rej => {
                            file.mv(uploadPath, (err) => {
                                if (err) {
                                    console.log(err);
                                    rej(false);
                                }
                                rej(true);
                            });
                        });
                        if (isFileLoaded) {
                            const url = new URL(`http://localhost:8001${folderPath.replace('public', '').replace('\\', '/')}/${file.name}`).href;
                            const createdFile = yield this.filesRepository.createFile({
                                url,
                                type: file.mimetype,
                                body
                            });
                            if (!createdFile)
                                throw new Error();
                            loadedFiles.push(createdFile);
                        }
                        else {
                            throw new Error();
                        }
                    }
                    this.ok(res, loadedFiles);
                    return;
                }
                else {
                    throw new Error();
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    deleteFile(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const id = params.id;
                const file = yield this.filesRepository.getFileById(id);
                if (!file) {
                    this.error(res, 404, 'File has not found');
                    return;
                }
                const url = decodeURI(new URL(file.url).pathname);
                (0, fs_1.unlink)((0, path_1.join)(__dirname, '..', '..', 'public', url), (err) => err && console.log(err));
                const deleted = yield this.filesRepository.deleteFile(id);
                if (deleted) {
                    this.ok(res, deleted);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
};
exports.FilesController = FilesController;
exports.FilesController = FilesController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.FilesRepository)),
    __metadata("design:paramtypes", [files_repository_1.FilesRepository])
], FilesController);
//# sourceMappingURL=files.controller.js.map