"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (app) {
    app.use("/foo", function (req, res) {
        res.send("foo");
    });
});
