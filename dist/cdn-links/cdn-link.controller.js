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
exports.CdnLinkController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const validateProperties_middleware_1 = require("../common/validateProperties.middleware");
const cdn_link_repository_1 = require("./cdn-link.repository");
let CdnLinkController = class CdnLinkController extends base_controller_1.BaseController {
    constructor(cdnLinkRepository) {
        super();
        this.cdnLinkRepository = cdnLinkRepository;
        this.bindRoutes([
            { path: '/', method: 'post', func: this.createLink,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'url',
                        'workspaceCssId',
                        'workspaceJsId',
                        'componentCssId',
                        'componentJsId'
                    ], true)
                ]
            },
            { path: '/:id', method: 'put', func: this.updateLink,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'url'
                    ])
                ]
            },
            { path: '/:id', method: 'delete', func: this.deleteLink,
                middlewares: []
            },
            { path: '/', method: 'get', func: this.getLinks,
                middlewares: []
            },
        ]);
    }
    getLinks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const links = yield this.cdnLinkRepository.getAll();
                if (links) {
                    this.ok(res, links);
                }
            }
            catch (error) {
                console.log(error);
                this.error(res, 500, 'Something was wrong, please try again later!');
            }
        });
    }
    createLink(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                const link = yield this.cdnLinkRepository.createLink(body);
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
    updateLink(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params, body }, res, next) {
            try {
                const { id } = params;
                const link = yield this.cdnLinkRepository.getLinkById(id);
                if (!link) {
                    this.error(res, 404, 'Link has not found');
                    return;
                }
                const updated = yield this.cdnLinkRepository.updateLink(id, body);
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
    deleteLink(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ params }, res, next) {
            try {
                const { id } = params;
                const link = yield this.cdnLinkRepository.getLinkById(id);
                if (!link) {
                    this.error(res, 404, 'Link has not found');
                    return;
                }
                const deleted = yield this.cdnLinkRepository.deleteLink(id);
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
exports.CdnLinkController = CdnLinkController;
exports.CdnLinkController = CdnLinkController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CdnLinkRepository)),
    __metadata("design:paramtypes", [cdn_link_repository_1.CdnLinkRepository])
], CdnLinkController);
//# sourceMappingURL=cdn-link.controller.js.map