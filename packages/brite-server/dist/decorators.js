"use strict";
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
var router_1 = require("./router");
var inversify_1 = require("inversify");
var types_1 = require("./types");
exports.get = function (path) { return function (target, key, descriptor) {
    router_1.Router.addRoute({
        path: path,
        method: "get",
        constructor: target.constructor,
        action: key,
        name: target.constructor.name,
    });
}; };
exports.controller = function (path, middleware) {
    if (path === void 0) { path = ""; }
    if (middleware === void 0) { middleware = []; }
    return function (target) {
        var currentMetadata = {
            middleware: middleware,
            path: path,
            target: target
        };
        inversify_1.decorate(inversify_1.injectable(), target);
        Reflect.defineMetadata(types_1.CONTROLLER, currentMetadata, target);
        var previousMetadata = Reflect.getMetadata(types_1.CONTROLLER, Reflect) || [];
        var newMetadata = __spread([currentMetadata], previousMetadata);
        Reflect.defineMetadata(types_1.CONTROLLER, newMetadata, Reflect);
    };
};
