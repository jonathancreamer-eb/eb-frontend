import express from 'express';

export interface IHttpContext {
    request: express.Request;
    response: express.Response;
    next: express.NextFunction;
    user: any;
}

export class HttpContext {
    public static async create(req, res, next) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = {
                    id: 1234,
                };
                resolve(new HttpContext(req, res, next, user));
            }, 0);
        });
    }

    constructor(
        public request: express.Request,
        public response: express.Response,
        public next: express.NextFunction,
        public user: any,
    ) {}
}