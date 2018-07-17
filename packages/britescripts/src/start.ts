import "reflect-metadata";
import { start } from "../../briteserver/build";

export function init() {
    const server = start({
        port: process.env.PORT || 3000,
    });

    const app = require(`${process.cwd()}/src`).default;

    app(server);
}