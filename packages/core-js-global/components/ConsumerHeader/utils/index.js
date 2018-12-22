import gettext from 'js-utils/gettext';
import lazyGettext from 'js-utils/lazy-gettext';
import {trackEventFromLink} from 'js-utils/analytics';
import {
    logCheckpointOnPageChange,
    logCheckpointViaAjax
} from 'js-utils/janus';
import {ANCHOR_LINK, DIVIDER} from 'eventbrite_design_system/navListItem/constants';
import {isNumber} from 'lodash';
import {generateProperties, isHomepage} from '../../../analytics/utils';
import * as analyticsConstants from '../../../analytics/constants';

// returns a function that when executed (i.e. when the user clicks)
// will submit a track link google analytics event
const getAnalyticsClickHandler = (
    {action, category, requestPath, label, userId, dimensions},
    {checkpointName, domain, pageWillChange = true} = {}
) => (() => {
    trackEventFromLink(
        generateProperties({
            action,
            category,
            requestPath,
            label,
            userId,
            dimensions,
        })
    );

    if (checkpointName) {
        if (pageWillChange) {
            logCheckpointOnPageChange(checkpointName, domain);
        } else {
            logCheckpointViaAjax(checkpointName);
        }
    }
});

export const getLogoInfo = (url, requestPath, logoOptions = {}) => ({
    url,

    onClick: getAnalyticsClickHandler({
        requestPath,
        action: analyticsConstants.ACTION_LOGO_HOME,
        category: analyticsConstants.CATEGORY_HEADER,
    }),

    ...logoOptions,
});

export const getBrowseEventsQuickLinks = (
    serverUrl,
    ebDomain,
    requestPath,
) => [{
    url: `${serverUrl}/d/local/events/`,
    content: gettext('Browse Events'),

    onClick: getAnalyticsClickHandler({
        requestPath,
        action: analyticsConstants.ACTION_DISCOVER,
        category: analyticsConstants.CATEGORY_HEADER,
    }, {
        checkpointName: 'discover_header_link_clicked',
        domain: ebDomain,
    }),
}];

export const getCreateEventCTA = (serverUrl, ebDomain, requestPath, isAuthenticated, canCreateEvents, customContent, dimensions = {}) => {
    let callToAction;
    let content = customContent ? customContent : lazyGettext('Create Event');

    if (customContent) {
        content = customContent;
    }

    if (canCreateEvents || isHomepage(requestPath)) {
        let dataAttributes = {
            'data-automation': 'global-nav-create',

            onClick: getAnalyticsClickHandler({
                requestPath,
                action: analyticsConstants.ACTION_CREATE_ATTEMPT,
                category: analyticsConstants.CATEGORY_HEADER,
                dimensions,
            }, {
                checkpointName: 'hiw_global_header_cta_clicked',
                pageWillChange: isAuthenticated,
                domain: ebDomain,
            }),
        };

        callToAction = {
            url: `${serverUrl}/create/`,
            content,
            ...dataAttributes,
        };
    }
    return callToAction;
};

export const getSearchInfo = (serverUrl, requestPath, query, suggestions, hideSearchBar) => {
    let searchInfo;

    if (requestPath !== '/' && !hideSearchBar) {
        searchInfo = {
            formAction: `${serverUrl}/d/`,
            label: gettext('Search for events'),
            query,
            suggestions,
        };
    }

    return searchInfo;
};

export const getNonUserQuickLinks = (requestPath, isAuthenticated, signupUrl, loginUrl) => {
    if (isAuthenticated) {
        return null;
    }

    return [{
        url: loginUrl,
        content: gettext('Sign In'),

        onClick: getAnalyticsClickHandler({
            requestPath,
            action: analyticsConstants.ACTION_LOGIN_ATTEMPT,
            category: analyticsConstants.CATEGORY_HEADER,
        }),
    }];
};

export const getMarketingSignInLink = (requestPath, isAuthenticated, url) => {
    if (isAuthenticated) {
        return null;
    }

    return [{
        url,
        content: gettext('Sign In'),

        onClick: getAnalyticsClickHandler({
            requestPath,
            action: analyticsConstants.ACTION_SIGNIN,
            category: analyticsConstants.CATEGORY_ORGANIZER_MARKETING_HEADER,
        }),
    }];
};

export const getHelpMenu = ({home, suggested}, requestPath) => {
    let suggestedHelpMenuItems = suggested.map(({url, label, gaLabel}) => ({
        type: ANCHOR_LINK,
        path: url,
        content: label,
        onClick: getAnalyticsClickHandler({
            requestPath,
            action: analyticsConstants.ACTION_HELP_ARTICLE,
            category: analyticsConstants.CATEGORY_HEADER,
            label: gaLabel,
        }),
    }));
    let navItems = [
        ...suggestedHelpMenuItems,
        {
            type: DIVIDER,
        },
        {
            type: ANCHOR_LINK,
            path: home,
            content: gettext('Help Center'),
            target: '_blank',
            rel: 'noopener noreferrer',

            onClick: getAnalyticsClickHandler({
                requestPath,
                action: analyticsConstants.ACTION_HELP_ARTICLE,
                category: analyticsConstants.CATEGORY_HEADER,
                label: analyticsConstants.LABEL_HELP_CENTER,
            }),
        },
    ];

    return {
        label: gettext('Help'),
        fallbackUrl: home,
        navItems,
    };
};

export const getOrganizeMenu = ({home:{url: homeUrl}, suggested}, requestPath) => {
    let suggestedOrganizeMenuItems = suggested.map(({url, label, gaLabel}) => ({
        type: ANCHOR_LINK,
        path: url,
        content: label,
        onClick: getAnalyticsClickHandler({
            requestPath,
            action: '',
            category: analyticsConstants.CATEGORY_HEADER,
            label: gaLabel,
        }),
    }));
    let navItems = [
        ...suggestedOrganizeMenuItems,
    ];

    return {
        label: gettext('Organize'),
        fallbackUrl: homeUrl,
        navItems,
    };
};

const getStaffUserMenuItems = ({
    adminServerUrl,
    hasTikibar,
    isStaff,
}) => {
    let menuItems = [];

    if (isStaff) {
        menuItems = [{
            type: ANCHOR_LINK,
            content: gettext('Admin'),
            path: `${adminServerUrl}/admin/search/`,
            iconType: 'globe-chunky',
            target: '_blank',
            rel: 'noopener noreferrer',
        }];

        if (hasTikibar) {
            menuItems.push({
                type: ANCHOR_LINK,
                content: gettext('Tikibar'),
                path: '/tikibar/settings/',
                iconType: 'info-chunky',
                target: '_blank',
                rel: 'noopener noreferrer',
            });
        }

        menuItems = [
            ...menuItems,
            {
                type: ANCHOR_LINK,
                content: gettext('Feature Flags'),
                path: `${adminServerUrl}/admin/nexus/gargoyle/`,
                iconType: 'flag-chunky',
                target: '_blank',
                rel: 'noopener noreferrer',
            },
            {
                type: ANCHOR_LINK,
                content: gettext('Experiments'),
                path: `${adminServerUrl}/admin/janus/`,
                iconType: 'keyboard-chunky',
                target: '_blank',
                rel: 'noopener noreferrer',
            },
            {
                type: DIVIDER,
            },
        ];
    }

    return menuItems;
};

const _getAttendeeUserMenuItems = (
    serverUrl,
    requestPath,
    canInvite,
    hasEvents,
    hasOrganizers,
    isAttendee,
) => {
    let menuItems = [];

    if (!isAttendee) {
        menuItems = [{
            type: DIVIDER,
        }, {
            type: ANCHOR_LINK,
            content: gettext('Manage Events'),
            path: `${serverUrl}/myevents/`,
            onClick: getAnalyticsClickHandler({
                requestPath,
                action: analyticsConstants.ACTION_PROFILE_DROPDOWN,
                category: analyticsConstants.CATEGORY_HEADER,
                label: analyticsConstants.LABEL_MY_EVENTS,
            }),
        }];

        if (hasOrganizers) {
            menuItems.push({
                type: ANCHOR_LINK,
                content: gettext('Organizer Profile'),
                path: `${serverUrl}/myprofile/`,

                onClick: getAnalyticsClickHandler({
                    requestPath,
                    action: analyticsConstants.ACTION_PROFILE_DROPDOWN,
                    category: analyticsConstants.CATEGORY_HEADER,
                    label: analyticsConstants.LABEL_ORGANIZER_PROFILE,
                }),
            });
        }

        if (hasEvents || canInvite) {
            menuItems.push({
                type: ANCHOR_LINK,
                content: gettext('Contacts'),
                path: `${serverUrl}/contacts/`,

                onClick: getAnalyticsClickHandler({
                    requestPath,
                    action: analyticsConstants.ACTION_PROFILE_DROPDOWN,
                    category: analyticsConstants.CATEGORY_HEADER,
                    label: analyticsConstants.LABEL_ORGANIZER_PROFILE,
                }),
            });
        }
    }

    return menuItems;
};


const getCreateEventMenuItems = (canCreateEvents, serverUrl) => {
    let createEventMenuItem = [];

    if (canCreateEvents) {
        createEventMenuItem.push({
            type: ANCHOR_LINK,
            content: gettext('Create Event'),
            path: `${serverUrl}/create/`,
        });
    }

    return createEventMenuItem;
};

const _getUserMenuItems = (
    adminServerUrl,
    canCreateEvents,
    canInvite,
    hasEvents,
    hasOrganizers,
    hasTikibar,
    isAttendee,
    isAuthenticated,
    isStaff,
    logoutUrl,
    numOrders,
    numSavedEvents,
    numFollowing,
    publicId,
    requestPath,
    serverUrl,
    accountSettingsPath,
    showBrowseEvents,
) => {
    let staffUserMenuItems = getStaffUserMenuItems({
        adminServerUrl,
        hasTikibar,
        isStaff,
    });
    let attendeeUserMenuItems = _getAttendeeUserMenuItems(
        serverUrl,
        requestPath,
        canInvite,
        hasEvents,
        hasOrganizers,
        isAttendee
    );
    let createEventMenuItems = getCreateEventMenuItems(canCreateEvents, serverUrl);
    let userItems = [
        {
            type: ANCHOR_LINK,
            content: gettext('Tickets (%(numOrders)s)', {numOrders}),
            path: `${serverUrl}/u/${publicId}/`,

            onClick: getAnalyticsClickHandler({
                requestPath,
                action: analyticsConstants.ACTION_PROFILE_DROPDOWN,
                category: analyticsConstants.CATEGORY_HEADER,
                label: analyticsConstants.LABEL_TICKETS,
            }),
        },
        {
            type: ANCHOR_LINK,
            content: gettext('Saved (%(numSavedEvents)s)', {numSavedEvents}),
            path: `${serverUrl}/u/${publicId}/saved`,

            onClick: getAnalyticsClickHandler({
                requestPath,
                action: analyticsConstants.ACTION_PROFILE_DROPDOWN,
                category: analyticsConstants.CATEGORY_HEADER,
                label: analyticsConstants.LABEL_SAVED,
            }),
        },
    ];

    if (showBrowseEvents) {
        userItems = [
            {
                type: ANCHOR_LINK,
                path: `${serverUrl}/d/local/events/`,
                content: gettext('Browse Events'),

                onClick: getAnalyticsClickHandler({
                    requestPath,
                    action: analyticsConstants.ACTION_DISCOVER,
                    category: analyticsConstants.CATEGORY_HEADER,
                }),
            },
            {
                type: DIVIDER,
            },
            ...userItems,
        ];
    }

    /* While ENABLE_DESTINATION_PROFILE is ramping up if numFollowing
    is undefined or null, that means that the user is not enrolled and
    so we should not display any following related links. */
    if (isNumber(numFollowing)) {
        userItems = [
            ...userItems,
            {
                type: ANCHOR_LINK,
                content: gettext('Following (%(numFollowing)s)', {numFollowing}),
                path: `${serverUrl}/u/${publicId}/followed/`,

                onClick: getAnalyticsClickHandler({
                    requestPath,
                    action: analyticsConstants.ACTION_PROFILE_DROPDOWN,
                    category: analyticsConstants.CATEGORY_HEADER,
                    label: analyticsConstants.LABEL_FOLLOWING,
                }),
            },
        ];
    }

    return [
        ...staffUserMenuItems,
        ...userItems,
        ...attendeeUserMenuItems,
        {
            type: DIVIDER,
        },
        {
            type: ANCHOR_LINK,
            content: gettext('Account Settings'),
            path: `${serverUrl}/${accountSettingsPath}/`,
            onClick: getAnalyticsClickHandler({
                requestPath,
                action: analyticsConstants.ACTION_PROFILE_DROPDOWN,
                category: analyticsConstants.CATEGORY_HEADER,
                label: analyticsConstants.LABEL_ACCOUNT,
            }),
        },
        ...createEventMenuItems,
        {
            type: ANCHOR_LINK,
            content: gettext('Log out'),
            path: logoutUrl,
        },
    ];
};

export const getUserMenuInfo = ({
    serverUrl,
    adminServerUrl,
    logoutUrl,
    requestPath,
    iconColor,
    user: {
        canCreateEvents,
        canInvite,
        firstName,
        hasEvents,
        hasOrganizers,
        hasTikibar,
        isAttendee,
        isAuthenticated,
        isStaff,
        numOrders,
        numSavedEvents,
        numFollowing,
        publicId,
        thumbnailUrl,
    },
    showBrowseEvents,
    isNewAccountSettingsActive,
}) => {
    let accountSettingsPath = 'account';

    if (!isAuthenticated) {
        return null;
    }
    if (isNewAccountSettingsActive) {
        accountSettingsPath = 'account-settings';
    }
    return {
        iconColor,
        label: firstName,
        fallbackUrl: `${serverUrl}/${accountSettingsPath}/`,
        imageUrl: thumbnailUrl,

        navItems: _getUserMenuItems(
            adminServerUrl,
            canCreateEvents,
            canInvite,
            hasEvents,
            hasOrganizers,
            hasTikibar,
            isAttendee,
            isAuthenticated,
            isStaff,
            logoutUrl,
            numOrders,
            numSavedEvents,
            numFollowing,
            publicId,
            requestPath,
            serverUrl,
            accountSettingsPath,
            showBrowseEvents,
        ),
    };
};
