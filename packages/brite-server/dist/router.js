"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_to_regexp_1 = __importDefault(require("path-to-regexp"));
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.addRoute = function (route) {
        var keys = [];
        this.routes.set(path_to_regexp_1.default(route.path, keys, {
            end: true,
            sensitive: false,
            strict: false,
        }), __assign({}, route, { keys: keys }));
    };
    Router.isRouteMatch = function () {
    };
    Router.routes = new Map();
    return Router;
}());
exports.Router = Router;
