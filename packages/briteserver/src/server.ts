import express from "express";
import { inject, injectable } from "inversify";
import { HTTP_APPLICATION, HTTP_CONTEXT } from "./types";
import { IControllerRegistry } from "./controllerRegistry";
import { IControllerFactory } from "./controllerFactory";
import { CONTROLLER_REGISTRY, CONTROLLER_FACTORY } from "./types";
import { HttpContext } from "./httpContext";

export interface IHttpServer {
    listen(port: string): void;
}

export interface IBriteServer extends IHttpServer {
    app: express.Application;
}

@injectable()
export class BriteServer implements IBriteServer {
    public app: express.Application;
    public registry: IControllerRegistry;
    public factory: IControllerFactory;
    
    constructor(
        @inject(HTTP_APPLICATION) app,
        @inject(CONTROLLER_REGISTRY) registry,
        @inject(CONTROLLER_FACTORY) factory,
    ) {
        this.app = app;
        this.registry = registry;
        this.factory = factory;
        this.initialize();
    }

    public initialize() {
        this.registry.register();

        this.app.all('*', (req, res, next) => this.createHttpContext(req, res, next));
        this.app.all('*', this.factory.createHandler());
    }

    public listen(port) {
        console.log(`Starting server on port ${port}.`);
        this.app.listen(port, this.onStart);
    }

    public use(...args) {
        this.app.use(...args);
    }

    private onStart = (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Server started.`);
        }
    }

    private createHttpContext = async (req, res, next) => {
        const context = await HttpContext.create(req, res, next);
        
        Reflect.defineMetadata(
            HTTP_CONTEXT,
            context,
            req,
        );
        
        next();
    };
}