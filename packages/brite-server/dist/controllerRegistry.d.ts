export interface IControllerRegistry {
    register(): void;
}
export declare class ControllerRegistery {
    private container;
    private basePath;
    private controllerPath;
    constructor(container: any);
    register(): void;
    private getControllersFromMetadata;
}
