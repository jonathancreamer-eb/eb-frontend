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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var types_1 = require("./types");
var HttpController = /** @class */ (function () {
    function HttpController(context) {
        this.context = context;
    }
    Object.defineProperty(HttpController.prototype, "response", {
        get: function () {
            return this.context.response;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpController.prototype, "request", {
        get: function () {
            return this.context.request;
        },
        enumerable: true,
        configurable: true
    });
    HttpController.prototype.json = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        (_a = this.response).json.apply(_a, __spread(args));
    };
    HttpController.prototype.html = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        this.response.setHeader('content-type', 'text/html');
        (_a = this.response).send.apply(_a, __spread(args));
    };
    HttpController = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.HTTP_CONTEXT))
    ], HttpController);
    return HttpController;
}());
exports.HttpController = HttpController;
