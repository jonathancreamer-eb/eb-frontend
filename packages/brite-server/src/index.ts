import { IBriteServer } from "./server";
import { container } from './container';
import { BRITE_SERVER } from "./types";

export * from './decorators';
export * from './httpController';
export * from './server';

export const start = ({
    port,
}) => {
    const server = container.get<IBriteServer>(BRITE_SERVER);

    server.listen(port);

    return server;
};
