import express from 'express';
export interface IHttpContext {
    request: express.Request;
    response: express.Response;
    next: express.NextFunction;
    user: any;
}
export declare class HttpContext {
    request: express.Request;
    response: express.Response;
    next: express.NextFunction;
    user: any;
    static create(req: any, res: any, next: any): Promise<{}>;
    constructor(request: express.Request, response: express.Response, next: express.NextFunction, user: any);
}
