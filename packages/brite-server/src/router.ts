import pathToRegexp from 'path-to-regexp';

export class Router {
    static routes: Map<RegExp, any> = new Map();

    static addRoute(route) {
        const keys = [];
        this.routes.set(pathToRegexp(route.path, keys, {
            end: true,
            sensitive: false,
            strict: false,
        }), {
            ...route,
            keys,
        });
    }

    static isRouteMatch() {

    }   
}