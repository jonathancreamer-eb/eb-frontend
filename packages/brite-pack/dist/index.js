"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var base_1 = __importDefault(require("./base"));
var Britepack = /** @class */ (function () {
    function Britepack(config) {
        this.config = webpack_merge_1.default(config, base_1.default);
        this.compiler = webpack_1.default(this.config);
    }
    Britepack.prototype.createMiddleware = function () {
        var middleware;
        try {
            middleware = webpack_dev_middleware_1.default(this.compiler, {
                publicPath: this.config.output.publicPath,
            });
        }
        catch (e) {
            console.error(e);
            throw new Error(e);
        }
        return middleware;
    };
    return Britepack;
}());
exports.Britepack = Britepack;
