import express from 'express';
import { IHttpContext } from './httpContext';
export interface IHttpController {
    context: IHttpContext;
}
export declare abstract class HttpController implements IHttpController {
    context: IHttpContext;
    readonly response: express.Response;
    readonly request: express.Request;
    constructor(context: any);
    json(...args: any[]): void;
    html(...args: any[]): void;
}
