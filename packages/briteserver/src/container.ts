import { Container } from "inversify";
import express from "express";
import { BriteServer, IBriteServer } from "./server";
import { HTTP_APPLICATION, BRITE_SERVER, CONTROLLER_REGISTRY, CONTROLLER_FACTORY, IOC_CONTAINER } from "./types";
import { ControllerRegistery, IControllerRegistry } from "./controllerRegistry";
import { IControllerFactory, ControllerFactory } from "./controllerFactory";

const container = new Container();

container.bind<IBriteServer>(BRITE_SERVER).to(BriteServer);
container.bind<IControllerRegistry>(CONTROLLER_REGISTRY).to(ControllerRegistery);
container.bind<IControllerFactory>(CONTROLLER_FACTORY).to(ControllerFactory);
container.bind<express.Application>(HTTP_APPLICATION).toFactory(() => {
    return express();
});

container.bind<Container>(IOC_CONTAINER).toConstantValue(container);

export { container };