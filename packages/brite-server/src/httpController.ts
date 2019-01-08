import { injectable, inject } from 'inversify';
import express from "express";
import { HTTP_CONTEXT } from './types';
import { IHttpContext } from './httpContext';

export interface IHttpController {
    context: IHttpContext;
}

@injectable()
export abstract class HttpController implements IHttpController {
    public context: IHttpContext;

    public get response(): express.Response {
        return this.context.response;
    }

    public get request(): express.Request {
        return this.context.request;
    }

    constructor(@inject(HTTP_CONTEXT) context) {
        this.context = context;
    }

    json(...args) {
        this.response.setHeader('content-type', 'application/json');
        this.response.json(...args);
    }

    html(...args) {
        this.response.setHeader('content-type', 'text/html');
        this.response.send(...args);
    }
}
