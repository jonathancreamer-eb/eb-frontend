"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = {
    entry: {
        app: path_1.default.join(process.cwd(), './src/app/index.tsx'),
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }],
    },
    resolve: {
        modules: [
            'node_modules',
            path_1.default.join(__dirname, '../../')
        ],
    }
};
exports.default = config;
