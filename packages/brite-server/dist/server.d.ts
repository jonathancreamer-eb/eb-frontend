import express from "express";
import { IControllerRegistry } from "./controllerRegistry";
import { IControllerFactory } from "./controllerFactory";
export interface IHttpServer {
    listen(port: string): void;
}
export interface IBriteServer extends IHttpServer {
    app: express.Application;
}
export declare class BriteServer implements IBriteServer {
    app: express.Application;
    registry: IControllerRegistry;
    factory: IControllerFactory;
    constructor(app: any, registry: any, factory: any);
    initialize(): void;
    listen(port: any): void;
    use(...args: any[]): void;
    private onStart;
    private createHttpContext;
}
