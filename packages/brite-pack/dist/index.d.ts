import webpack from 'webpack';
export declare class Britepack {
    compiler: webpack.Compiler;
    config: webpack.Configuration;
    constructor(config: webpack.Configuration);
    createMiddleware(): any;
}
