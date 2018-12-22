import {DE_CURRENCY_FORMAT} from 'js-utils/intl/constants';

export const ENV = {
    serverUrl: 'serverUrl',
    ebDomain: 'ebDomain',
    adminServerUrl: 'adminServerUrl',
    signupUrl: 'signupUrl',
    loginUrl: 'loginUrl',
    logoutUrl: 'logoutUrl',
    searchLocation: 'searchLocation',
    currencyFormat: DE_CURRENCY_FORMAT,
    locales: [
        {locale: 'es_AR', 'locale_name': 'Argentina'},
        {locale: 'en_AU', 'locale_name': 'Australia'},
        {locale: 'nl_BE', 'locale_name': 'België'},
        {locale: 'fr_BE', 'locale_name': 'Belgique'},
        {locale: 'pt_BR', 'locale_name': 'Brasil'},
        {locale: 'en_CA', 'locale_name': 'Canada (EN)'},
        {locale: 'fr_CA', 'locale_name': 'Canada (FR)'},
        {locale: 'es_CL', 'locale_name': 'Chile'},
        {locale: 'es_CO', 'locale_name': 'Colombia'},
        {locale: 'de_DE', 'locale_name': 'Deutschland'},
        {locale: 'es_ES', 'locale_name': 'España'},
        {locale: 'fr_FR', 'locale_name': 'France'},
        {locale: 'en_HK', 'locale_name': 'Hong Kong'},
        {locale: 'en_IE', 'locale_name': 'Ireland'},
        {locale: 'it_IT', 'locale_name': 'Italia'},
        {locale: 'es_MX', 'locale_name': 'Mexico'},
        {locale: 'nl_NL', 'locale_name': 'Nederland'},
        {locale: 'en_NZ', 'locale_name': 'New Zealand'},
        {locale: 'de_AT', 'locale_name': 'Österreich'},
        {locale: 'es_PE', 'locale_name': 'Peru'},
        {locale: 'pt_PT', 'locale_name': 'Portugal'},
        {locale: 'en_SG', 'locale_name': 'Singapore'},
        {locale: 'en_GB', 'locale_name': 'United Kingdom'},
        {locale: 'en_US', 'locale_name': 'United States'},
    ],
    localeInfo: {
        'tld': '.de',
        'locale': 'de_DE',
        'locale_name': 'Deutschland',
        'contact_us_path': 'localeContactUsPath',
        'contact_us_url': 'localeContactUsUrl',
        'sales_contact_landing_page': 'localeSalesContactLanding',
        'sales_contact_link_text': 'localeSalesContactLinkText',
        'twitter_page': 'localeTwitter',
        'twitter_handle': 'localeTwitterHandle',
        'facebook_page': 'localeFacebookPage',
        'facebook_locale': 'localeFacebook',
        'linked_in_page': 'localeLinkedIn',
        'instagram_page': 'localeInstagram',
        'google_plus_page': 'localeGooglePlus',
        'blog_url': 'localeBlog',
    },
    helpUrls: {
        home: 'helpHome',
        impressum: 'helpImpressum',
        suggested: [],
    },
    organizeUrls: {
        home: {
            'url': 'organizeUrl',
            'label': 'organizeUiLabel',
            'gaLabel': 'organizeGaLabel',
        },
        suggested: [],
    },
    isNewAccountSettingsActive: false,
};

export const USER = {
    publicId: '226753142328',
    email: 'eng@eventbrite.com',
    fullName: 'Eventbrite Developer',
    firstName: 'Eventbrite',
    lastName: 'Developer',
    isAuthenticated: true,
    hasEvents: true,
    hasOrganizers: true,
    canCreateEvents: true,
    isAttendee: false,
    thumbnailUrl: 'https://path.com/to/image',
};

export const FOOTER_LINKS = {
    popularSearches: [],
    eventsToPlan: [],
    thirdFooterColumn: [],
    thirdFooterColumnName: 'Find Events',
    countries: [
        {locale: 'es_AR', 'locale_name': 'Argentina', href: 'http://www.evbdev.com.ar', tld: '.com.ar'},
        {locale: 'en_AU', 'locale_name': 'Australia', href: 'http://www.evbdev.com.au', tld: '.com.au'},
        {locale: 'nl_BE', 'locale_name': 'België', href: 'http://www.evbdev.be', tld: '.be'},
        {locale: 'fr_BE', 'locale_name': 'Belgique', href: 'http://www.evbdev.be/fr_BE/', tld: '.be'},
        {locale: 'pt_BR', 'locale_name': 'Brasil', href: 'http://www.evbdev.com.br', tld: '.com.br'},
        {locale: 'en_CA', 'locale_name': 'Canada (EN)', href: 'http://www.evbdev.ca', tld: '.ca'},
        {locale: 'fr_CA', 'locale_name': 'Canada (FR)', href: 'http://www.evbdev.ca/fr_CA/', tld: '.ca'},
        {locale: 'es_CL', 'locale_name': 'Chile', href: 'http://www.evbdev.es', tld: '.cl'},
        {locale: 'es_CO', 'locale_name': 'Colombia', href: 'http://www.evbdev.es', tld: '.co'},
        {locale: 'de_DE', 'locale_name': 'Deutschland', href: 'http://www.evbdev.de', tld: '.de'},
        {locale: 'es_ES', 'locale_name': 'España', href: 'http://www.evbdev.es', tld: '.es'},
        {locale: 'fr_FR', 'locale_name': 'France', href: 'http://www.evbdev.fr', tld: '.fr'},
        {locale: 'en_HK', 'locale_name': 'Hong Kong', href: 'http://www.evbdev.hk', tld: '.hk'},
        {locale: 'en_IE', 'locale_name': 'Ireland', href: 'http://www.evbdev.ie', tld: '.ie'},
        {locale: 'it_IT', 'locale_name': 'Italia', href: 'http://www.evbdev.it', tld: '.it'},
        {locale: 'es_MX', 'locale_name': 'Mexico', href: 'http://www.evbdev.es', tld: '.com.mx'},
        {locale: 'nl_NL', 'locale_name': 'Nederland', href: 'http://www.evbdev.nl', tld: '.nl'},
        {locale: 'en_NZ', 'locale_name': 'New Zealand', href: 'http://www.evbdev.co.nz', tld: '.co.nz'},
        {locale: 'de_AT', 'locale_name': 'Österreich', href: 'http://www.evbdev.at', tld: '.at'},
        {locale: 'es_PE', 'locale_name': 'Peru', href: 'http://www.evbdev.es', tld: '.pe'},
        {locale: 'pt_PT', 'locale_name': 'Portugal', href: 'http://www.evbdev.pt', tld: '.pt'},
        {locale: 'en_SG', 'locale_name': 'Singapore', href: 'http://www.evbdev.sg', tld: '.sg'},
        {locale: 'en_GB', 'locale_name': 'United Kingdom', href: 'http://www.evbdev.co.uk', tld: '.co.uk'},
        {locale: 'en_US', 'locale_name': 'United States', href: 'http://www.evbdev.com', tld: '.com'},
    ],
};

export const NAV_LINK_PERMS = Object.freeze({
    visibleNavLinks: [
        'account',
    ],
    accountPermissions: {
        userIsEventHolder: true,
        userMfaRequired: true,
    },
});
