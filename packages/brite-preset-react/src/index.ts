import 'reflect-metadata';
import { start } from '@eventbrite/brite-server';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Britepack } from '@eventbrite/brite-pack';
import hook from 'css-modules-require-hook';
import config from './webpack/config';

const appHandler = (req, res, next) => {
    const reactAppPath = `${process.cwd()}/src/app/components/app`;
    const ReactApp = require(reactAppPath).default; 
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
        hook({
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            rootDir: path.resolve(
                process.cwd(),
                process.env.NODE_ENV === 'production' ? 'dist' : 'src',
            ),
        });
        
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