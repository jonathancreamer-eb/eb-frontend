import PropTypes from 'prop-types';

export const PAGE_LOCALES_ARRAY_PROP_TYPE = PropTypes.arrayOf(
    PropTypes.shape({
        'locale': PropTypes.string.isRequired,
        'locale_name': PropTypes.string.isRequired,
    })
);

export const PAGE_LOCALE_INFO_SHAPE_PROP_TYPE = PropTypes.shape({
    'tld': PropTypes.string.isRequired,
    'locale': PropTypes.string.isRequired,
    'locale_name': PropTypes.string.isRequired,
    'contact_us_path': PropTypes.string.isRequired,
    'contact_us_url': PropTypes.string.isRequired,
    'sales_contact_landing_page': PropTypes.string.isRequired,
    'sales_contact_link_text': PropTypes.string.isRequired,
    'twitter_page': PropTypes.string.isRequired,
    'facebook_page': PropTypes.string.isRequired,
    'linked_in_page': PropTypes.string.isRequired,
    'instagram_page': PropTypes.string.isRequired,
    'google_plus_page': PropTypes.string.isRequired,
    'blog_url': PropTypes.string.isRequired,
});

export const FOOTER_LINKS_DATA_SHAPE_PROP_TYPE = PropTypes.arrayOf(
    PropTypes.shape({
        pk: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })
);

export const FOOTER_COUNTRIES_ARRAY_PROP_TYPE = PropTypes.arrayOf(
    PropTypes.shape({
        'locale': PropTypes.string.isRequired,
        'tld': PropTypes.string.isRequired,
        'locale_name': PropTypes.string.isRequired,
    })
);

export const FOOTER_HELP_LINKS_PROP_TYPE = PropTypes.shape({
    home: PropTypes.string.isRequired,
    impressum: PropTypes.string.isRequired,

    suggested: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            gaLabel: PropTypes.string,
        })
    ).isRequired,
});

export const HEADER_ORGANIZE_LINKS_PROP_TYPE = PropTypes.shape({
    home: PropTypes.shape({
        url: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        gaLabel: PropTypes.string,
    }).isRequired,

    suggested: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            gaLabel: PropTypes.string,
        })
    ).isRequired,
});

export const PAGE_ENV_SHAPE_PROP_TYPE = PropTypes.shape({
    serverUrl: PropTypes.string.isRequired,
    ebDomain: PropTypes.string.isRequired,
    adminServerUrl: PropTypes.string.isRequired,
    signupUrl: PropTypes.string.isRequired,
    loginUrl: PropTypes.string.isRequired,
    logoutUrl: PropTypes.string.isRequired,
    searchLocation: PropTypes.string.isRequired,
    locales: PAGE_LOCALES_ARRAY_PROP_TYPE.isRequired,
    localeInfo: PAGE_LOCALE_INFO_SHAPE_PROP_TYPE.isRequired,
    helpUrls: FOOTER_HELP_LINKS_PROP_TYPE.isRequired,
    organizeUrls: HEADER_ORGANIZE_LINKS_PROP_TYPE.isRequired,

    searchQuery: PropTypes.string,
    isNewAccountSettingsActive: PropTypes.bool,
});

export const PAGE_REQUEST_SHAPE_PROP_TYPE = PropTypes.shape({
    path: PropTypes.string.isRequired,
});

export const PAGE_USER_SHAPE_PROP_TYPE = PropTypes.shape({
    canInvite: PropTypes.bool,
    canCreateEvents: PropTypes.bool,
    firstName: PropTypes.string,
    fullName: PropTypes.string,
    hasEvents: PropTypes.bool,
    hasOrganizers: PropTypes.bool,
    hasTikibar: PropTypes.bool,
    isAttendee: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    isStaff: PropTypes.bool,
    numOrders: PropTypes.number,
    numSavedEvents: PropTypes.number,
    publicId: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    numFollowing: PropTypes.number,
});

export const PAGE_FOOTER_LINKS_SHAPE_PROP_TYPE = PropTypes.shape({
    popularSearches: FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
    eventsToPlan: FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
    thirdFooterColumn: FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
    countries: FOOTER_COUNTRIES_ARRAY_PROP_TYPE.isRequired,
    showMinimalLinks: PropTypes.bool,
    thirdFooterColumnName: PropTypes.string.isRequired,
});

export const GA_SETTINGS_PROP_TYPE = PropTypes.shape({
    isActive: PropTypes.bool,
    userPartnerId: PropTypes.string,
    guestPartnerId: PropTypes.string,
    correlationId: PropTypes.string,
    activeScopeUserId: PropTypes.string,
});

export const GA_DIMENSIONS_PROP_TYPE = PropTypes.shape({
    eventId: PropTypes.string,
    userId: PropTypes.string,
    experimentId: PropTypes.string,
    experimentId3: PropTypes.string,
});

