import fs from 'fs';
import path from 'path';
import { IControllerMetadata } from './decorators';
import { CONTROLLER } from './types';
import { inject, injectable } from 'inversify';
import { IOC_CONTAINER } from './types';

export interface IControllerRegistry {
    register(): void;
}

@injectable()
export class ControllerRegistery {
    private basePath = path.join(process.cwd(), 'src');
    private controllerPath = path.join(this.basePath, 'server', 'controllers');

    constructor(@inject(IOC_CONTAINER) private container) {}

    public register() {
        if (!fs.existsSync(this.controllerPath)) {
            return;
        }

        const files = fs.readdirSync(this.controllerPath);

        files.forEach((file) => {
            require(path.join(this.controllerPath, file));
        });

        const controllers = this.getControllersFromMetadata();
        controllers.forEach((constructor) => {
            const name = constructor.name;

            this.container.bind(CONTROLLER)
                .to(constructor)
                .whenTargetNamed(name);
        });
    }

    private getControllersFromMetadata() {
        const arrayOfControllerMetadata: IControllerMetadata[] = Reflect.getMetadata(
            CONTROLLER,
            Reflect
        ) || [];
        return arrayOfControllerMetadata.map((metadata) => metadata.target);
    }
}