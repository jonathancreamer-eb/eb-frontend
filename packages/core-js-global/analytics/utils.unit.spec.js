import {stub} from 'js-utils/test';
import * as analyticsUtils from 'js-utils/analytics';
import {
    trackEventFromState,
    trackEventFromStateOnPageUnload,
    generateProperties
} from './utils';

jest.mock('js-utils/analytics', () => ({
    'trackEvent': jest.fn(),
    'trackEventFromLink': jest.fn(),
}));

describe('generateProperties', () => {

    it('should correctly make user and eventId dimensions', () => {
        let actual = generateProperties({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            eventId: '1003',
            userId: '1007',
        });
        const expected = {
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [
                {index: '12', value: '1003'},
                {index: '14', value: '1007'},
            ],
        };

        expect(actual).toEqual(expected);
    });

    it('should handle userId and eventId not being provided', () => {
        let actual = generateProperties({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
        });
        const expected = {
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [],
        };

        expect(actual).toEqual(expected);
    });

});

describe('trackEventFromState', () => {

    it('should correctly grab the userId from the state', () => {
        trackEventFromState(
            {gaSettings: {userPartnerId: '2014'}},
            {
                action: 'testAction',
                category: 'testCat',
                label: 'testLabel',
            }
        );

        expect(analyticsUtils.trackEvent).lastCalledWith({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [
                {index: '14', value: '2014'},
            ],
        });
    });

    it('should correctly grab the eventId from the state', () => {
        trackEventFromState(
            {gaSettings: {userPartnerId: '2014'}, eventId: '2006'},
            {
                action: 'testAction',
                category: 'testCat',
                label: 'testLabel',
            }
        );

        expect(analyticsUtils.trackEvent).lastCalledWith({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [
                {index: '12', value: '2006'},
                {index: '14', value: '2014'},
            ],
        });
    });

    it('should allow dimension overrides', () => {
        trackEventFromState(
            {gaSettings: {userPartnerId: '2014'}},
            {
                action: 'testAction',
                category: 'testCat',
                label: 'testLabel',
                dimensions: {
                    userId: '1007',
                    sessionId: '6',
                },
            }
        );

        expect(analyticsUtils.trackEvent).lastCalledWith({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [
                {index: '14', value: '1007'},
                {index: '20', value: '6'},
            ],
        });
    });

});

describe('trackEventFromStateOnPageUnload', () => {

    it('should correctly grab the userId from the state', () => {
        trackEventFromStateOnPageUnload(
            {gaSettings: {userPartnerId: '2014'}},
            {
                action: 'testAction',
                category: 'testCat',
                label: 'testLabel',
            }
        );

        expect(analyticsUtils.trackEventFromLink).lastCalledWith({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [
                {index: '14', value: '2014'},
            ],
        });
    });

    it('should correctly grab the eventId from the state', () => {
        trackEventFromStateOnPageUnload(
            {gaSettings: {userPartnerId: '2014'}, eventId: '2006'},
            {
                action: 'testAction',
                category: 'testCat',
                label: 'testLabel',
            }
        );

        expect(analyticsUtils.trackEventFromLink).lastCalledWith({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [
                {index: '12', value: '2006'},
                {index: '14', value: '2014'},
            ],
        });
    });

    it('should allow dimension overrides', () => {
        trackEventFromStateOnPageUnload(
            {gaSettings: {userPartnerId: '2014'}},
            {
                action: 'testAction',
                category: 'testCat',
                label: 'testLabel',
                dimensions: {
                    userId: '1007',
                    sessionId: '6',
                },
            }
        );

        expect(analyticsUtils.trackEventFromLink).lastCalledWith({
            action: 'testAction',
            category: 'testCat',
            label: 'testLabel',
            dimensions: [
                {index: '14', value: '1007'},
                {index: '20', value: '6'},
            ],
        });
    });

});
