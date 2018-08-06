import path from 'path';
import webpack from 'webpack';
import { tsLoader, cssModulesTypescript } from '@eventbrite/brite-pack';

const config: webpack.Configuration = {
    entry: {
        app: path.join(process.cwd(), './src/app/client.tsx'),
    },
    module: {
        rules: [
            tsLoader,
            cssModulesTypescript
        ],
    }
}

export default config;