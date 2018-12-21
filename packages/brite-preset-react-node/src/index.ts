import "reflect-metadata";
import { start } from "@eventbrite/brite-server";

export default class BritePrefixReactNode {
    public async start() {
        console.log('starting');
        const server = start({
            port: process.env.PORT || 3000,
        });
    
        const app = require(`${process.cwd()}/src`).default;
    
        app(server);
    }
}