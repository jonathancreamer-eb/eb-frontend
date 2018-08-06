import 'reflect-metadata';
import { start } from '@eventbrite/brite-server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Britepack } from '@eventbrite/brite-pack';
import config from './webpack/config';

const appHandler = (req, res, next) => {
    const reactAppPath = `${process.cwd()}/src/app/app`;
    const ReactApp = require(reactAppPath).default; 
    console.log(ReactApp);
    const body = renderToString(React.createElement(ReactApp));
    
    const layoutPath = `${process.cwd()}/src/app/layouts`;
    const ReactLayout = require(layoutPath).default; 
    const staticMarkup = renderToString(React.createElement(ReactLayout, {
        body,
    }));

    res.send(staticMarkup);
};

export default class BritePresetReact {
    public async start() {
        const server = start({
            port: process.env.PORT || 3000,
        });
        const applicationPath = `${process.cwd()}/src`;
        const app = require(applicationPath).default;

        const britepack = new Britepack(config);
        server.app.use(britepack.createMiddleware())
        server.app.get('*', appHandler);
    
        await app(server);
    }
}