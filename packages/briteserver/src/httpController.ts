import express from 'express';
import { request } from 'http';
import { injectable, inject } from 'inversify';
import { HTTP_CONTEXT } from './types';
import { IHttpContext } from './httpContext';

export interface IHttpController {
    context: IHttpContext;
}

@injectable()
export abstract class HttpController implements IHttpController {
    public context: IHttpContext;

    public get response() {
        return this.context.response;
    }

    public get request() {
        return this.context.request;
    }

    constructor(@inject(HTTP_CONTEXT) context) {
        this.context = context;
    }

    json(...args) {
        this.response.json(...args);
    }

    html(...args) {
        this.response.setHeader('content-type', 'text/html');
        this.response.send(...args);
    }
}
