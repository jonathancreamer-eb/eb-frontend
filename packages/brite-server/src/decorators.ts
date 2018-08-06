import { Router } from "./router";
import { decorate, injectable } from "inversify";
import { CONTROLLER } from "./types";

export const get = (path) => (target, key, descriptor) => {
    Router.addRoute({
        path,
        method: "get",
        constructor: target.constructor,
        action: key,
        name: target.constructor.name,
    });
};

export interface IControllerMetadata {
    middleware: any[];
    path: string;
    target: any;
}

export const controller = (path = "", middleware = []) => (target) => {
    const currentMetadata: IControllerMetadata = {
        middleware: middleware,
        path: path,
        target: target
    };

    decorate(injectable(), target);
    Reflect.defineMetadata(CONTROLLER, currentMetadata, target);

    const previousMetadata: IControllerMetadata[] = Reflect.getMetadata(
        CONTROLLER,
        Reflect
    ) || [];

    const newMetadata = [currentMetadata, ...previousMetadata];

    Reflect.defineMetadata(
        CONTROLLER,
        newMetadata,
        Reflect
    );
}   