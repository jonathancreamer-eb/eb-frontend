import path from 'path';

export const tsLoader = {
    test: /\.tsx?$/,
    use: [
    // {
    //     loader: 'babel-loader',
    //     options: {
    //         plugins: ['css-modules-transform'],
    //     },
    // },
        'ts-loader',
    ],
};

export const cssModulesTypescript = {
    test: /\.css?$/,
    use: [
        'style-loader', {
            loader: 'typings-for-css-modules-loader',
            options: {
            context: path.resolve(process.cwd(), 'src'),
              localIdentName: '[name]__[local]___[hash:base64:5]',
              minimize: false,
              modules: true,
              namedExport: true,
            },
        },
    ],
};
