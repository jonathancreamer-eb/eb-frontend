export declare const tsLoader: {
    test: RegExp;
    use: string[];
};
export declare const cssModulesTypescript: {
    test: RegExp;
    use: (string | {
        loader: string;
        options: {
            context: string;
            localIdentName: string;
            minimize: boolean;
            modules: boolean;
            namedExport: boolean;
        };
    })[];
};
