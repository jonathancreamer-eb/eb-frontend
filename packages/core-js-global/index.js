import * as aConstants from './analytics/constants';

export * from './prop-types';

export {default as CoreStructure} from './components/CoreStructure';
export {default as ConsumerHeader} from './components/ConsumerHeader';
export {default as CoreFooter} from './components/CoreFooter';

export {
    generateProperties as generateAnalyticsProperties,
    trackInitialPageView
} from './analytics/utils';
export {
    trackCreateFunnelEvent,
    trackCreateFunnelLinkEvent,
    trackCreateFunnelEventSelectWithDisplay
} from './analytics/event';
export const analyticsConstants = aConstants;
