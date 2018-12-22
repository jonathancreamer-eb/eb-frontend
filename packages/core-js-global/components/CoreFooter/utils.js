import gettext from 'js-utils/gettext';
import {getSelectPropValues} from 'eventbrite_design_system/select/util';

export const DEVELOPER_URL = 'http://developer.eventbrite.com';

export const SALES_CONTACT_SUPPORTED_TLDS = {
    '.com': 1,
    '.co.uk': 1,
    '.com.au': 1,
    '.de': 1,
    '.ie': 1,
    '.com.ar': 1,
};

const _HTTP_REGEX = /http:/;

export const getLocales = (locales) => getSelectPropValues(locales, 'locale_name', 'locale');

const _getSalesContactLinks = (serverUrl, localeInfo) => {
    let {tld, locale} = localeInfo;
    let supportsSalesContacts = tld in SALES_CONTACT_SUPPORTED_TLDS || (tld === '.ca' && locale === 'en_CA');
    let links = [];

    if (supportsSalesContacts) {
        links = [{
            url: `${serverUrl}${localeInfo['sales_contact_landing_page']}`,
            content: localeInfo['sales_contact_link_text'],
            additionalClassName: 'eds-hide-md eds-hide-mw eds-hide-ln eds-hide-lg eds-hide-lw',
        }];
    }

    return links;
};
const _getImpressumLinks = (impressumUrl, tld) => {
    let links = [];

    if (tld === '.de') {
        links = [{
            url: impressumUrl,
            content: 'Impressum',
        }];
    }

    return links;
};

export const getMinimalGeneralLinks = (serverUrl) => [{
    url: `${serverUrl}/l/LegalTerms/`,
    content: gettext('Terms'),
    rel: 'nofollow',
}, {
    url: `${serverUrl}/privacypolicy/`,
    content: gettext('Privacy'),
    rel: 'nofollow',
}, {
    url: `${serverUrl}/cookies/`,
    content: gettext('Cookies'),
    rel: 'nofollow',
}];

export const getGeneralLinks = (
    serverUrl,
    localeInfo,
    helpLinks,
) => [{
    url: `${serverUrl}/how-it-works`,
    content: gettext('How It Works'),
    additionalClassName: 'eds-hide-md eds-hide-mw eds-hide-ln eds-hide-lg eds-hide-lw',
}, {
    url: `${serverUrl}/fees`,
    content: gettext('Pricing'),
    additionalClassName: 'eds-hide-md eds-hide-mw eds-hide-ln eds-hide-lg eds-hide-lw',
}, {
    url: `${localeInfo['contact_us_url']}`,
    content: gettext('Contact Support'),
    additionalClassName: 'eds-hide-md eds-hide-mw eds-hide-ln eds-hide-lg eds-hide-lw',
}, ..._getSalesContactLinks(serverUrl, localeInfo), {
    url: `${serverUrl}/about`,
    content: gettext('About'),
}, {
    url: `https://${localeInfo['blog_url']}`,
    content: gettext('Blog'),
}, {
    url: helpLinks.home,
    content: gettext('Help'),
}, {
    url: `${serverUrl}/careers/`,
    content: gettext('Careers'),
}, {
    url: `${serverUrl}/press/`,
    content: gettext('Press'),
}, {
    url: `${serverUrl}/security/`,
    content: gettext('Security'),
    rel: 'nofollow',
}, {
    url: DEVELOPER_URL,
    content: gettext('Developers'),
}, {
    url: `${serverUrl}/l/LegalTerms/`,
    content: gettext('Terms'),
    rel: 'nofollow',
}, {
    url: `${serverUrl}/privacypolicy/`,
    content: gettext('Privacy'),
    rel: 'nofollow',
}, {
    url: `${serverUrl}/cookies/`,
    content: gettext('Cookies'),
    rel: 'nofollow',
}, ..._getImpressumLinks(helpLinks.impressum, localeInfo.tld)];

export const getSecondarySections = (isUserAuthenticated, countries) => {
    let secondarySections;

    if (isUserAuthenticated) {
        secondarySections = [{
            title: gettext('Country'),

            links: countries.map(({href, locale, locale_name: content}) => {
                let url = href.replace(_HTTP_REGEX, 'https:');

                return {
                    url,
                    content,
                    'data-automation': `footer-${locale}`,
                };
            }),
        }];
    }

    return secondarySections;
};

const _getMainLinks = (links) => (
    links.map(({link, title}) => ({
        url: link,
        content: title,
    }))
);


const _getGooglePlusLinks = (localeInfo) => {
    let links = [];

    if (localeInfo.tld !== '.de') {
        links = [{
            url: `https://${localeInfo['google_plus_page']}`,
            content: gettext('Google+'),
            target: '_blank',
            rel: 'noopener noreferrer',
        }];
    }

    return links;
};
const _getSocialLinks = (
    serverUrl,
    localeInfo,
) => [{
    url: `${localeInfo['contact_us_url']}`,
    content: gettext('Contact Support'),
}, ..._getSalesContactLinks(serverUrl, localeInfo), {
    url: `https://${localeInfo['twitter_page']}`,
    content: gettext('Twitter'),
    target: '_blank',
    rel: 'noopener noreferrer',
}, {
    url: `https://${localeInfo['facebook_page']}`,
    content: gettext('Facebook'),
    target: '_blank',
    rel: 'noopener noreferrer',
}, {
    url: `https://${localeInfo['linked_in_page']}`,
    content: gettext('LinkedIn'),
    target: '_blank',
    rel: 'noopener noreferrer',
}, {
    url: `https://${localeInfo['instagram_page']}`,
    content: gettext('Instagram'),
    target: '_blank',
    rel: 'noopener noreferrer',
}, ..._getGooglePlusLinks(localeInfo)];

export const getMainSections = (
    serverUrl,
    localeInfo,
    popularSearches,
    eventsToPlan,
    thirdFooterColumn,
    thirdFooterColumnName
) => [{
    title: gettext('Use Eventbrite'),
    links: _getMainLinks(popularSearches),
}, {
    title: gettext('Plan Events'),
    links: _getMainLinks(eventsToPlan),
}, {
    title: thirdFooterColumnName,
    links: _getMainLinks(thirdFooterColumn),
}, {
    title: gettext('Connect With Us'),
    links: _getSocialLinks(serverUrl, localeInfo),
}];

