"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presets = {
    react: '@eventbrite/brite-preset-react',
    reactNode: '@eventbrite/brite-preset-react-node',
};
exports.init = function (options) {
    var presetPackage = presets[options.preset];
    if (presetPackage) {
        var Preset = require("@eventbrite/brite-preset-" + options.preset).default;
        var instance = new Preset(options);
        instance.start();
    }
};
