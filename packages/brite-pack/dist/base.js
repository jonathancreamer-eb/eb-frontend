"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = {
    devtool: '#@cheap-module-eval-source-map',
    mode: 'development',
    output: {
        chunkFilename: '[name]-chunk.js',
        filename: '[name].js',
        path: path_1.default.join(process.cwd(), 'public', 'assets'),
        publicPath: '/assets/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    resolveLoader: {
        modules: [
            path_1.default.join(__dirname, '../node_modules'),
        ],
    },
};
exports.default = config;
