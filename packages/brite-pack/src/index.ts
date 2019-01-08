import { BritepackCompiler } from './britepack';

export const britepack = (config) => {
    return new BritepackCompiler(config);
}