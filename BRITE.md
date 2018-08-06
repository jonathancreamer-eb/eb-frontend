```json
{
  "name": "@eventbrite/app-create",
  "private": true,
  "scripts": {
    "start": "brite start",
    "test": "brite run test",
    "lint": "brite run lint"
  },
  "dependencies": {
    "@eventbrite/brite-cli": "1.0.0",
    "@eventbrite/brite-preset-react": "1.0.0",
  },
  "brite": {
    "presets": "react"
  }
}
```

```bash
brite start
```

```ts
export interface IBritePreset {
    start(): ICommandResponse;
}

/* brite-preset-react/index.js */
import britepack from "@eventbrite/brite-pack";
import britetsc from "@eventbrite/brite-typescript";
import britejest from "@eventbrite/brite-jest";
import config from "./config";

export class BritePresetReact implements IBritePreset {
    public async start() {
        const pack = await britepack({
            config,
            mode: 'production',
        });
    },
    public async dev() {
        const pack = await britepack({
            config,
            mode: 'production',
            watch: true,
        });
    },
    public async build() {
        await britepack(config);
        await britetsc();
    },
    public async test() {

    }

}
/* brite-preset-react/webpack/webpack.config.ts */
import webpack from "webpack";
import merge from "webpack-merge";
import { baseBritepackConfig } from "@eventbrite/brite-pack";

export type ConfigurationBuilder = (options: IBritePresetConfig) => webpack.Configuration;
export type LoaderBuilder = (options: IBritePresetConfig) => webpack.Loader;

const reactLoader: LoaderBuilder = (options) => ({
    test: /.(tsx|jsx)$/,
    exclude: "node_modules",
    use: {
        loader: "typescript-loader",
    };
});

const styleLoaders: { [key: string]: LoaderBuilder } = {
    css: (options) => ({

    }),
    style: (options) => ({
        
    }),
};

const cssModulesLoader: LoaderBuilder = (options) => ({
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        styleLoaders.style,
        styleLoaders.css,
        styleLoaders.postcss
    ].map((fn) => fn(options)),
});

const reactConfig: webpack.Configuration = {
    module: {
        rules: [
            reactLoader,
        ]
    }
};

const config: ConfigurationBuilder = (options) => merge.smart(
    basePritepackConfig,
    cssModulesConfig,
    reactConfig,
    appConfig,
    options,
);

export default config;
```

webpack
    css?
    css modules?
    sass?
babel
typescript
jest
node

