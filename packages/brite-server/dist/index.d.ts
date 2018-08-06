import { IBriteServer } from "./server";
export * from './decorators';
export * from './httpController';
export * from './server';
export declare const start: ({ port, }: {
    port: any;
}) => IBriteServer;
