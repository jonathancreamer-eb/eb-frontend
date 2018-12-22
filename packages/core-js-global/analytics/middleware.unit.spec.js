import analyticsMiddleware from './middleware';
import * as analyticsUtils from './utils';
import {stub} from 'js-utils/test';

const create = () => {
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(),
    };
    const next = jest.fn();
    const getDefaults = jest.fn(() => ({}));

    const invoke = (action, appProps) => analyticsMiddleware(appProps, getDefaults)(store)(next)(action);

    return {store, next, invoke, getDefaults};
};

describe('Analytics Middleware', () => {

    beforeEach(() => {
        stub(analyticsUtils, 'trackEventFromState');
    });

    afterEach(() => {
        analyticsUtils.trackEventFromState.mockRestore();
    });

    describe('when action is not an analytics action', () => {

        it('passes through non-meta actions', () => {
            const {next, invoke} = create();
            const action = {type: 'TEST'};

            invoke(action);

            expect(next).toHaveBeenCalledWith(action);
        });

        it('passes through non-analytics action', () => {
            const {next, invoke} = create();
            const action = {
                type: 'TEST',
                meta: {},
            };

            invoke(action);

            expect(next).toHaveBeenCalledWith(action);
        });
    });

    describe('when action is a proper analytics action', () => {

        it('calls the getDefaults function once', () => {
            const {getDefaults, invoke} = create();
            const action = {
                type: 'TEST',
                meta: {
                    analytics: {
                        action: 'testAction',
                    },
                },
            };

            invoke(action);

            expect(getDefaults).toHaveBeenCalledTimes(1);
        });

        it('calls the getDefaults function with the state', () => {
            const {invoke, store} = create();
            const action = {
                type: 'TEST',
                meta: {
                    analytics: {
                        action: 'testAction',
                    },
                },
            };

            invoke(action);

            expect(store.getState).toHaveBeenCalledTimes(1);
        });

        it('calls trackEventFromState with the provided payload', () => {
            const {invoke} = create();
            const payload = {
                action: 'testAction',
            };
            const action = {
                type: 'TEST',
                meta: {
                    analytics: payload,
                },
            };
            const expected = {
                ...payload,
                dimensions: {},
            };

            invoke(action);

            expect(analyticsUtils.trackEventFromState).toHaveBeenCalledTimes(1);
            expect(analyticsUtils.trackEventFromState).toHaveBeenCalledWith({}, expected);
        });

        it('calls trackEventFromState with any custom dimensions', () => {
            const {invoke} = create();
            const payload = {
                action: 'testAction',
                dimensions: {
                    'testDimension': 'test',
                },
            };
            const action = {
                type: 'TEST',
                meta: {
                    analytics: payload,
                },
            };

            invoke(action);

            expect(analyticsUtils.trackEventFromState).toHaveBeenCalledTimes(1);
            expect(analyticsUtils.trackEventFromState).toHaveBeenCalledWith({}, payload);
        });

        it('calls trackEventFromState with merged appProps', () => {
            const {invoke} = create();
            const payload = {
                action: 'testAction',
            };
            const action = {
                type: 'TEST',
                meta: {
                    analytics: payload,
                },
            };
            const expectedPayload = {
                ...payload,
                dimensions: {},
            };
            const appProps = {
                'gaSettings': {
                    'userParnerId': '1234',
                },
            };

            invoke(action, appProps);

            expect(analyticsUtils.trackEventFromState).toHaveBeenCalledTimes(1);
            expect(analyticsUtils.trackEventFromState).toHaveBeenCalledWith(appProps, expectedPayload);
        });
    });
});
