export declare const get: (path: any) => (target: any, key: any, descriptor: any) => void;
export interface IControllerMetadata {
    middleware: any[];
    path: string;
    target: any;
}
export declare const controller: (path?: string, middleware?: any[]) => (target: any) => void;
