import {trackEventFromState} from './utils';

/**
 * Google Analytics Middleware that allows seamless integration of google analytics events with redux actions
 * and ensures proper passing of the userPartnerId.
 *
 * It tracks actions that have an 'analytics' object inside the 'meta' object of the action
 *
 * @param {object} appProps - can include GA encoded user id and eventId
 * @param {function} getDefaults - populates GA payload from state, returns an object.
 *     One can & should provide this info at the action-level, this param is only used for globally setting
 *     data across an entire app.
 * @return {function} Result from next steps of the middleware
 *
 * @example
 * Use it with the configureStore helper to add it to the middleware of the app:
 *
 * this._store = configureStore({
 *     reducer,
 *     initialState: {},
 *     middleware: [analyticsMiddleware(appProps)],
 * });
 *
 * If you would like to add some (default) GA props globally to your app, provide a
 * getDefaults arg to the middleware:
 *
 * analyticsMiddleware(appProps, (state) => ({
 *     category: 'myGACat',
 *     dimensions: {
 *         sessionId: state.sessionId,
 *     },
 * })
 *
 * Then simply dispatch an action with `meta.analytics` information:
 *
 * dispatch({
 *     type: MY_ACTION,
 *     payload: {...},
 *     meta: {
 *         analytics: {
 *             action: MY_ACTION_GA_ACTION,
 *             category: MY_ACTION_CATEGORY,
 *             label: A_LABEL,
 *             dimensions: {
 *                 isFirstOrder: true,
 *             },
 *         }
 *     }
 * });
 *
 * Only `action` and `category` are required. The user and event dimensions will be populated automatically
 * from the state, if available.
 */
export default (appProps, getDefaults = () => ({})) =>
({getState}) => (next) => (action) => {
    const result = next(action);

    // Intercept actions with meta analytics
    if (!action.meta || !action.meta.analytics) {
        return result;
    }

    let state = getState();
    let payload = action.meta.analytics;
    let defaults = getDefaults(state);

    payload = {
        ...defaults,
        ...payload,
        dimensions: {
            ...defaults.dimensions || {},
            ...payload.dimensions || {},
        },
    };

    trackEventFromState({...appProps, ...state}, payload);

    return result;
};
