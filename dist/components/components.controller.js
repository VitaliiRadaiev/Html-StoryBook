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
exports.ComponentsController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const validateProperties_middleware_1 = require("../common/validateProperties.middleware");
const path_1 = require("path");
const fs_1 = require("fs");
const components_repository_1 = require("./components.repository");
let ComponentsController = class ComponentsController extends base_controller_1.BaseController {
    constructor(componentsRepository) {
        super();
        this.componentsRepository = componentsRepository;
        this.bindRoutes([
            { path: '/:id', method: 'get', func: this.getComponentById,
                middlewares: []
            },
            { path: '/', method: 'post', func: this.createComponent,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'title',
                        'workspaceId',
                        'folderId'
                    ], true)
                ]
            },
            { path: '/:id', method: 'put', func: this.updateComponent,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'title',
                        'html',
                        'scss',
                        'js',
                        'folderId',
                        'workspaceId'
                    ], true)
                ]
            },
            { path: '/:id', method: 'delete', func: this.deleteComponent,
                middlewares: []
            },
        ]);
    }
    getComponentById(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const id = params.id;
                const component = yield this.componentsRepository.getComponentById(id);
                if (component) {
                    this.ok(res, component);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    createComponent(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                const component = yield this.componentsRepository.createComponent(body);
                if (component) {
                    const folderPath = (0, path_1.join)('./public/files/', `component_${component.id}_files`);
                    if (!(0, fs_1.existsSync)(folderPath)) {
                        (0, fs_1.mkdirSync)(folderPath);
                    }
                    this.ok(res, component);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    updateComponent(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body, params }, res, next) {
            try {
                const id = params.id;
                const component = yield this.componentsRepository.getComponentById(id);
                if (!component) {
                    this.error(res, 404, 'Component has not found');
                    return;
                }
                const updated = yield this.componentsRepository.updateComponent(id, body);
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
    deleteComponent(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const id = params.id;
                const component = yield this.componentsRepository.getComponentById(id);
                if (!component) {
                    this.error(res, 404, 'Component has not found');
                    return;
                }
                const deleted = yield this.componentsRepository.deleteComponent(id);
                if (deleted) {
                    const folderPath = (0, path_1.join)('./public/files/', `component_${deleted.id}_files`);
                    if ((0, fs_1.existsSync)(folderPath)) {
                        (0, fs_1.rm)(folderPath, { recursive: true, force: true }, (err) => {
                            if (err)
                                console.log(err);
                        });
                    }
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
exports.ComponentsController = ComponentsController;
exports.ComponentsController = ComponentsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ComponentsRepository)),
    __metadata("design:paramtypes", [components_repository_1.ComponentsRepository])
], ComponentsController);
//# sourceMappingURL=components.controller.js.map