"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.tsLoader = {
    test: /\.tsx?$/,
    use: [
        // {
        //     loader: 'babel-loader',
        //     options: {
        //         plugins: ['css-modules-transform'],
        //     },
        // },
        'ts-loader',
    ],
};
exports.cssModulesTypescript = {
    test: /\.css?$/,
    use: [
        'style-loader', {
            loader: 'typings-for-css-modules-loader',
            options: {
                context: path_1.default.resolve(process.cwd(), 'src'),
                localIdentName: '[name]__[local]___[hash:base64:5]',
                minimize: false,
                modules: true,
                namedExport: true,
            },
        },
    ],
};
