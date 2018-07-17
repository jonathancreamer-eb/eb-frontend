import express from 'express';
import { Router } from "./router";
import { inject, Container, injectable } from "inversify";
import { CONTROLLER, IOC_CONTAINER, HTTP_CONTEXT } from "./types";
import { IHttpContext } from './httpContext';

export interface IControllerFactory {
    createHandler(): express.Handler;
}

@injectable()
export class ControllerFactory implements IControllerFactory {
    public container: Container;

    constructor(@inject(IOC_CONTAINER) container) {
        this.container = container;
    }
    
    createController() {
        
    }
    
    createHandler() {
        return async (req, res, next) => {
            let match;
            for (const [path, route] of Router.routes.entries()) {
                match = path.exec(req.url);
        
                if (match) {
                    const [url, ...values] = match;
                    const params = route.keys.reduce((memo, key, index) => {
                        memo[key.name] = values[index];
                        return memo;
                    }, {});
        
                    req.params = params;
        
                    if (url === req.originalUrl) {
                        const context = this.getHttpContext(req);
                        const childContainer = this.container.createChild();
                        childContainer.bind<IHttpContext>(HTTP_CONTEXT)
                            .toConstantValue(context);
                        const controller = childContainer.getNamed(CONTROLLER, route.name);
        
                        try {
                            const result = await controller[route.action]();
                        } catch(e) {
                            next(e);
                        }
                    }
                }
            }
        
            if (!match) {
                return next();
            }
        };
    }

    private getHttpContext(req: express.Request) {
        const httpContext = Reflect.getMetadata(
            HTTP_CONTEXT,
            req
        );
        return httpContext;
    }
}
