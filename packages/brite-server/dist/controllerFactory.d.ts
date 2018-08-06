import express from 'express';
import { Container } from "inversify";
export interface IControllerFactory {
    createHandler(): express.Handler;
}
export declare class ControllerFactory implements IControllerFactory {
    container: Container;
    constructor(container: any);
    createController(): void;
    createHandler(): (req: any, res: any, next: any) => Promise<any>;
    private getHttpContext;
}
