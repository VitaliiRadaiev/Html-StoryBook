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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExeptionFilter = void 0;
const inversify_1 = require("inversify");
const http_error_class_1 = require("./http-error.class");
require("reflect-metadata");
let ExeptionFilter = class ExeptionFilter {
    constructor() { }
    catch(err, req, res, next) {
        if (err instanceof http_error_class_1.HTTPError) {
            console.log(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({ err: err.message });
        }
        else {
            console.log(`${err.message}`);
            res.status(500).send({ err: err.message });
        }
    }
};
exports.ExeptionFilter = ExeptionFilter;
exports.ExeptionFilter = ExeptionFilter = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ExeptionFilter);
//# sourceMappingURL=exeption.filter.js.map