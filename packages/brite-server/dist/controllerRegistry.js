"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var types_1 = require("./types");
var inversify_1 = require("inversify");
var types_2 = require("./types");
var ControllerRegistery = /** @class */ (function () {
    function ControllerRegistery(container) {
        this.container = container;
        this.basePath = path_1.default.join(process.cwd(), 'src');
        this.controllerPath = path_1.default.join(this.basePath, 'server', 'controllers');
    }
    ControllerRegistery.prototype.register = function () {
        var _this = this;
        if (!fs_1.default.existsSync(this.controllerPath)) {
            return;
        }
        var files = fs_1.default.readdirSync(this.controllerPath);
        files.forEach(function (file) {
            require(path_1.default.join(_this.controllerPath, file));
        });
        var controllers = this.getControllersFromMetadata();
        controllers.forEach(function (constructor) {
            var name = constructor.name;
            _this.container.bind(types_1.CONTROLLER)
                .to(constructor)
                .whenTargetNamed(name);
        });
    };
    ControllerRegistery.prototype.getControllersFromMetadata = function () {
        var arrayOfControllerMetadata = Reflect.getMetadata(types_1.CONTROLLER, Reflect) || [];
        return arrayOfControllerMetadata.map(function (metadata) { return metadata.target; });
    };
    ControllerRegistery = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_2.IOC_CONTAINER))
    ], ControllerRegistery);
    return ControllerRegistery;
}());
exports.ControllerRegistery = ControllerRegistery;
