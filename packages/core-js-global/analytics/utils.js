import _ from 'lodash';
import {HAS_WINDOW} from 'eventbrite_design_system/utils/dom';
import {
    setInternalUseGACookie,
    trackEvent,
    trackEventFromLink,
    trackPendingInternalLink,
    trackPageView
} from 'js-utils/analytics';
import {getWindowObject} from 'js-utils/feature-detection';
import {DIMENSIONS} from 'js-utils/analytics/constants';
import {ANALYTICS_LABEL_MAP} from './constants';

export const isHomepage = (requestPath) => requestPath === '/';

const _getPathFromWindow = () => {
    if (HAS_WINDOW) {
        return window.location.href;
    }

    return '';
};

// NOTE: Adapted from ebapps.analytics.helpers.global_header_analytics_events_attrs
const _getLabelFromRequest = (requestPath) => {
    let eventLabel = '';
    requestPath = requestPath || _getPathFromWindow();

    if (requestPath) {
        // need to look in ANALYTICS_LABEL_MAP to see if one of its keys are a
        // matching sub path. If so use the value as the event label.
        eventLabel = _.find(ANALYTICS_LABEL_MAP, (labelValue, requestSubPath) => (
            requestPath.indexOf(requestSubPath) > -1
        ));

        // Special case for home page
        if (!eventLabel && isHomepage(requestPath)) {
            eventLabel = 'home';
        }
    }

    return eventLabel;
};

const _makeDimensions = (dims) => (
     _.entries(dims)
        .filter(([name, value]) => value !== undefined)
        .map(([name, value]) => DIMENSIONS[name](value))
);

const _makeDimensionParams = (dims) => (
    _makeDimensions(dims)
        .reduce((acc, dim) => ({
            ...acc,
            [`dimension${dim.index}`]: dim.value,
        }), {})
);

export const generateProperties = ({action, category, requestPath, label, eventId, userId, dimensions}) => ({
    action,
    category,
    label: label || _getLabelFromRequest(requestPath),
    dimensions: _makeDimensions({...dimensions, eventId, userId}),
});

/** This method purposefully does not supply a default argument for the gaSettings. 
 * We want every app to supply their gaSettings as appropriate every time we do tracking.
 * Without that, we aren't consistently tracking user interactions across the site.
 */
const _getDimensionsFromState = ({eventId, eid, gaSettings}) => ({
    eventId: eventId || eid,
    userId: gaSettings.userPartnerId || '0',
    guestId: gaSettings.guestPartnerId,
    correlationId: gaSettings.correlationId,
    activeScopeUserId: gaSettings.activeScopeUserId,
});

/**
 * Utility function to track a google analytics event while populating dimension values from the state.
 * This allows us to set user and event id from the default state of an EB JS app.
 *
 * @param {object} state - State of the application. Grabs the user and event id from this to populate the
 *     associated dimensions. Should be in format {gaSettings: {userPartnerId: '1007'}, event: {publicEventId: '1003'}}
 * @param {string} action - GA action name
 * @param {string} category - GA action category
 * @param {string} label - GA action label. Will attempt to map from the current request path if not provided.
 * @param {object} dimensions - map of dimenstion to value. Available dimensions can be found here:
 *     https://github.com/eventbrite/js-utils/blob/master/analytics/constants.js#L12
 * @param {string} requestPath - request path. Will grab from the window if not provided. Used to generate label.
 * @param {object} properties - Other properties. Options are here:
 *     https://github.com/eventbrite/js-utils/blob/master/analytics/constants.js#L56
 */
export const trackEventFromState = (state, {
    action,
    category,
    label=null,
    dimensions={},
    requestPath=null,
    ...properties
}) => (
    trackEvent({
        action,
        category,
        label: label || _getLabelFromRequest(requestPath),
        dimensions: _makeDimensions({
            ..._getDimensionsFromState(state),
            ...dimensions,
        }),
        ...properties,
    })
);

/**
 * Utility function to track a google analytics event on page unload or immediately on the next page request. Useful
 * when tracking an event immediately before changing thewindow location to ensure that the GA event is fired. Uses
 * the same logic to parse state into dimensions as trackEventFromState
 *
 * @param {object} state - State of the application. Grabs the user and event id from this to populate the
 *     associated dimensions. Should be in format {gaSettings: {userPartnerId: '1007'}, event: {publicEventId: '1003'}}
 * @param {string} action - GA action name
 * @param {string} category - GA action category
 * @param {string} label - GA action label. Will attempt to map from the current request path if not provided.
 * @param {object} dimensions - map of dimenstion to value. Available dimensions can be found here:
 *     https://github.com/eventbrite/js-utils/blob/master/analytics/constants.js#L12
 * @param {string} requestPath - request path. Will grab from the window if not provided. Used to generate label.
 * @param {object} properties - Other properties. Options are here:
 *     https://github.com/eventbrite/js-utils/blob/master/analytics/constants.js#L56
 */
export const trackEventFromStateOnPageUnload = (state, {
    action,
    category,
    label=null,
    dimensions={},
    requestPath=null,
    ...properties
}) => (
    trackEventFromLink({
        action,
        category,
        label: label || _getLabelFromRequest(requestPath),
        dimensions: _makeDimensions({
            ..._getDimensionsFromState(state),
            ...dimensions,
        }),
        ...properties,
    })
);

export const trackInitialPageView = (gaSettings, dimensions = {}) => {
    // NOTE: adapted from core/django/templates/shared/google_analytics.html
    // but excluding all of the event-specific logic which now needs to be passed
    // in within `dimensions`

    if (!gaSettings || !gaSettings.isActive) {
        return;
    }

    setInternalUseGACookie();
    trackPendingInternalLink('ebEventToTrack');
    trackPageView({
        ...dimensions,
        ..._makeDimensionParams({
            urlParams: getWindowObject('location').search,
            ..._getDimensionsFromState({gaSettings}),
        }),
    });
};
