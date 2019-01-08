import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import merge from 'webpack-merge';
import base from './base';

export class BritepackCompiler {
    public compiler: webpack.Compiler;
    public config: webpack.Configuration;
    
    constructor(config: webpack.Configuration) {
        this.config = merge(config, base);
        this.compiler = webpack(this.config);
    }

    public createMiddleware() {
        let middleware;
        try {
            middleware = webpackDevMiddleware(this.compiler, {
                publicPath: this.config.output.publicPath,
            });
        } catch(e) {
            console.error(e);
            throw new Error(e);
        }

        return middleware;
    }
}

export * from './loaders';