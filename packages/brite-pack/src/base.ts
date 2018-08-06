import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    devtool: '#@cheap-module-eval-source-map',
    mode: 'development',
    output: {
        chunkFilename: '[name]-chunk.js',
        filename: '[name].js',
        path: path.join(process.cwd(), 'public', 'assets'),
        publicPath: '/assets/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules'),
        ],
    },
};

export default config;