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
exports.UtilsController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const validateProperties_middleware_1 = require("../common/validateProperties.middleware");
const sass_1 = __importDefault(require("sass"));
const postcss_1 = __importDefault(require("postcss"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const url_1 = require("url");
let UtilsController = class UtilsController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.bindRoutes([
            {
                path: '/convert-sass', method: 'post', func: this.convertSass,
                middlewares: [
                    new validateProperties_middleware_1.ValidatePropertiesMiddleware([
                        'sass'
                    ])
                ]
            },
        ]);
    }
    convertSass(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                let sassString = body.sass || '';
                sassString = sassString.replace(/http:\/\/localhost:8001/g, '_public');
                const result = yield sass_1.default.compileStringAsync(sassString, {
                    importers: [{
                            findFileUrl(url) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (url.startsWith('~')) {
                                        return new URL((0, url_1.pathToFileURL)('node_modules/' + url.substring(1)));
                                    }
                                    else if (url.startsWith('_public')) {
                                        return new URL((0, url_1.pathToFileURL)(url.substring(1)));
                                    }
                                    else {
                                        return null;
                                    }
                                });
                            },
                        }]
                });
                const prefixedCSS = yield (0, postcss_1.default)([(0, autoprefixer_1.default)({
                        overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
                    })]).process(result.css.toString(), {
                    from: undefined
                });
                this.ok(res, {
                    css: prefixedCSS.css || '',
                    error: null
                });
            }
            catch (error) {
                if (error instanceof sass_1.default.Exception) {
                    this.ok(res, {
                        css: '',
                        error: error.message
                    });
                }
                else {
                    console.log(error);
                    this.error(res, 500, 'Something was wrong, please try again later!');
                }
            }
        });
    }
};
exports.UtilsController = UtilsController;
exports.UtilsController = UtilsController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], UtilsController);
//# sourceMappingURL=utils.controller.js.map