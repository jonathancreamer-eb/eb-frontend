"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var express_1 = __importDefault(require("express"));
var server_1 = require("./server");
var types_1 = require("./types");
var controllerRegistry_1 = require("./controllerRegistry");
var controllerFactory_1 = require("./controllerFactory");
var container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.BRITE_SERVER).to(server_1.BriteServer);
container.bind(types_1.CONTROLLER_REGISTRY).to(controllerRegistry_1.ControllerRegistery);
container.bind(types_1.CONTROLLER_FACTORY).to(controllerFactory_1.ControllerFactory);
container.bind(types_1.HTTP_APPLICATION).toFactory(function () {
    return express_1.default();
});
container.bind(types_1.IOC_CONTAINER).toConstantValue(container);
