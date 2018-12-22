import {trackEventFromLink, trackEvent} from 'js-utils/analytics';


export const trackCreateFunnelEvent = (action, label, userId = null, category = 'create-funnel') => (
    trackEvent({action, category, label}, undefined, userId)
);

export const trackCreateFunnelLinkEvent = (action, label, userId = null, category = 'create-funnel') => (
    trackEventFromLink({action, category, label}, userId)
);

/**
 * Pass the display value of a dropdown selection as a label
 * when tracking the event creation funnel
 *
 * @param {Array} values
 * @param {string} action
 * @param {string} selection
 */
export const trackCreateFunnelEventSelectWithDisplay = (values, action, selection) => {
    if (values) {
        let result = values.find((item) => item.value === selection) || {};

        trackCreateFunnelEvent(action, result.display);
    }
};
