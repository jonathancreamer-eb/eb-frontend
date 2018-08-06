"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = {
    devtool: 'source-map',
    output: {
        filename: './dist/bundle.js',
    },
    resolveLoader: {
        modules: [
            path_1.default.join(require.resolve('@eventbrite/brite-pack'), 'node_modules'),
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
};
exports.default = config;
