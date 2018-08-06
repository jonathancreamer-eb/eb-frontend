import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    entry: {
        app: path.join(process.cwd(), './src/app/index.tsx'),
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }],
    },
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, '../../')
        ],
    }
}

export default config;