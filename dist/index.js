"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.appContainer = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const types_1 = require("./types");
const prisma_service_1 = require("./database/prisma.service");
const exeption_filter_1 = require("./errors/exeption.filter");
const config_service_1 = require("./config/config.service");
const work_space_controller_1 = require("./work-spaces/work-space.controller");
const work_space_repository_1 = require("./work-spaces/work-space.repository");
const cdn_link_controller_1 = require("./cdn-links/cdn-link.controller");
const cdn_link_repository_1 = require("./cdn-links/cdn-link.repository");
const files_controller_1 = require("./files/files.controller");
const files_repository_1 = require("./files/files.repository");
const folders_repository_1 = require("./folders/folders.repository");
const folders_controller_1 = require("./folders/folders.controller");
const components_controller_1 = require("./components/components.controller");
const components_repository_1 = require("./components/components.repository");
const utils_controller_1 = require("./utils/utils.controller");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.Application).to(app_1.App);
    bind(types_1.TYPES.ExeptionFilter).to(exeption_filter_1.ExeptionFilter).inRequestScope();
    bind(types_1.TYPES.PrismaService).to(prisma_service_1.PrismaService).inRequestScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inRequestScope();
    bind(types_1.TYPES.WorkSpaceController).to(work_space_controller_1.WorkSpaceController).inRequestScope();
    bind(types_1.TYPES.WorkSpaceRepository).to(work_space_repository_1.WorkSpaceRepository).inRequestScope();
    bind(types_1.TYPES.CdnLinkController).to(cdn_link_controller_1.CdnLinkController).inRequestScope();
    bind(types_1.TYPES.CdnLinkRepository).to(cdn_link_repository_1.CdnLinkRepository).inRequestScope();
    bind(types_1.TYPES.FilesController).to(files_controller_1.FilesController).inRequestScope();
    bind(types_1.TYPES.FilesRepository).to(files_repository_1.FilesRepository).inRequestScope();
    bind(types_1.TYPES.FoldersController).to(folders_controller_1.FoldersController).inRequestScope();
    bind(types_1.TYPES.FoldersRepository).to(folders_repository_1.FoldersRepository).inRequestScope();
    bind(types_1.TYPES.ComponentsController).to(components_controller_1.ComponentsController).inRequestScope();
    bind(types_1.TYPES.ComponentsRepository).to(components_repository_1.ComponentsRepository).inRequestScope();
    bind(types_1.TYPES.UtilsController).to(utils_controller_1.UtilsController).inRequestScope();
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { appContainer, app };
}
_a = bootstrap(), exports.appContainer = _a.appContainer, exports.app = _a.app;
//# sourceMappingURL=index.js.map