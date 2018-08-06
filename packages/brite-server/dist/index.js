"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("./container");
var types_1 = require("./types");
__export(require("./decorators"));
__export(require("./httpController"));
__export(require("./server"));
exports.start = function (_a) {
    var port = _a.port;
    var server = container_1.container.get(types_1.BRITE_SERVER);
    server.listen(port);
    return server;
};
