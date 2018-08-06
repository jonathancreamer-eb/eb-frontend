"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var path_1 = __importDefault(require("path"));
var App = require(path_1.default.join(process.cwd(), './src/app/index.tsx'));
react_dom_1.hydrate(react_1.default.createElement(App, null), document.querySelector('#app'));
