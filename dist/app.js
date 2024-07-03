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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const types_1 = require("./types");
const prisma_service_1 = require("./database/prisma.service");
const work_space_controller_1 = require("./work-spaces/work-space.controller");
const cdn_link_controller_1 = require("./cdn-links/cdn-link.controller");
const files_controller_1 = require("./files/files.controller");
const folders_controller_1 = require("./folders/folders.controller");
const components_controller_1 = require("./components/components.controller");
const utils_controller_1 = require("./utils/utils.controller");
let App = class App {
    constructor(exeptionFilter, prismaService, configService, workSpaceController, cdnLinkController, filesController, foldersController, componentsController, utilsController) {
        this.exeptionFilter = exeptionFilter;
        this.prismaService = prismaService;
        this.configService = configService;
        this.workSpaceController = workSpaceController;
        this.cdnLinkController = cdnLinkController;
        this.filesController = filesController;
        this.foldersController = foldersController;
        this.componentsController = componentsController;
        this.utilsController = utilsController;
        this.app = (0, express_1.default)();
        this.port = 8001;
        this.server = (0, http_1.createServer)(this.app);
    }
    useMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_fileupload_1.default)({}));
    }
    useRoutes() {
        this.app.use('/api/work-spaces', this.workSpaceController.router);
        this.app.use('/api/cdn-links', this.cdnLinkController.router);
        this.app.use('/api/files', this.filesController.router);
        this.app.use('/api/folders', this.foldersController.router);
        this.app.use('/api/components', this.componentsController.router);
        this.app.use('/api/utils', this.utilsController.router);
    }
    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useMiddleware();
            this.app.use('/files', express_1.default.static(path_1.default.join(__dirname, '../public/files')));
            this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public/build')));
            this.useRoutes();
            this.useExeptionFilters();
            this.app.get('*', (req, res) => {
                res.sendFile(path_1.default.join(__dirname, '../public/build', 'index.html'));
            });
            yield this.prismaService.connect();
            this.server.listen(this.port);
            console.log('Server is running on ' + this.configService.get('HOST'));
        });
    }
};
exports.App = App;
exports.App = App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ExeptionFilter)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.PrismaService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.WorkSpaceController)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.CdnLinkController)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.FilesController)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.FoldersController)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.ComponentsController)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.UtilsController)),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService, Object, work_space_controller_1.WorkSpaceController,
        cdn_link_controller_1.CdnLinkController,
        files_controller_1.FilesController,
        folders_controller_1.FoldersController,
        components_controller_1.ComponentsController,
        utils_controller_1.UtilsController])
], App);
//# sourceMappingURL=app.js.map