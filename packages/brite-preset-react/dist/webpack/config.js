"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var brite_pack_1 = require("@eventbrite/brite-pack");
var config = {
    entry: {
        app: path_1.default.join(process.cwd(), './src/app/client.tsx'),
    },
    module: {
        rules: [
            brite_pack_1.tsLoader,
            brite_pack_1.cssModulesTypescript
        ],
    }
};
exports.default = config;
