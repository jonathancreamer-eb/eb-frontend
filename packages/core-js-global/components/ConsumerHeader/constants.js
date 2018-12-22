import gettext from 'js-utils/gettext';

export const SUGGESTIONS_API_URL = '/directory/autocomplete/';
export const DEFAULT_LOCATION = 'Current Location';
export const SUGGESTIONS_RESPONSE_GROUPS = [
    'top_match',
    'events',
    'organizers',
    'categories',
    'popular_queries',
];

export const FALLBACK_CATEGORIES = [{
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('Arts'),
    source: 'autocomp',
    url: '/d/local/arts--events/',
    value: 'Arts',
}, {
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('Business'),
    source: 'autocomp',
    url: '/d/local/business--events/',
    value: 'Business',
}, {
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('Charity & Causes'),
    source: 'autocomp',
    url: '/d/local/charity-and-causes--events/',
    value: 'Charity & Causes',
}, {
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('Community'),
    source: 'autocomp',
    url: '/d/local/community--events/',
    value: 'Community',
}, {
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('Film & Media'),
    source: 'autocomp',
    url: '/d/local/film-and-media--events/',
    value: 'Film & Media',
}, {
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('Food & Drink'),
    source: 'autocomp',
    url: '/d/local/food-and-drink--events/',
    value: 'Food & Drink',
}, {
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('Music'),
    source: 'autocomp',
    url: '/d/local/music--events/',
    value: 'Music',
}, {
    type: 'Category',
    category: gettext('Categories'),
    label: gettext('All Categories'),
    source: 'autocomp',
    url: '/d/local/events/',
    value: 'All Categories',
}];

export const FALLBACK_SUGGESTIONS = FALLBACK_CATEGORIES
    .map(({label, url}) => ({
        content: label,
        value: url,
    }));
