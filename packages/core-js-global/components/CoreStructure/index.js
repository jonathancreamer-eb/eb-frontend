import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    flowRight,
    isUndefined
} from 'lodash';
import Structure from 'eventbrite_design_system/structure/Structure';
import addOverlayControls from 'eventbrite_design_system/structure/hoc/addOverlayControls';
import addMainControls from 'eventbrite_design_system/structure/hoc/addMainControls';
import addFocusDrawerControls from 'eventbrite_design_system/structure/hoc/addFocusDrawerControls';
import CookieNotification from 'eventbrite_design_system/notification/CookieNotification';

import ConsumerHeader from '../ConsumerHeader';
import CoreFooter from '../CoreFooter';
import {
    PAGE_ENV_SHAPE_PROP_TYPE,
    PAGE_REQUEST_SHAPE_PROP_TYPE,
    PAGE_USER_SHAPE_PROP_TYPE,
    PAGE_FOOTER_LINKS_SHAPE_PROP_TYPE
} from '../../prop-types';
import {setWindowLocation} from 'js-utils/http';
import gettext from 'js-utils/gettext';


class CoreStructure extends Component {
    static propTypes = {
        ...Structure.propTypes,
        env: PAGE_ENV_SHAPE_PROP_TYPE.isRequired,
        request: PAGE_REQUEST_SHAPE_PROP_TYPE.isRequired,
        user: PAGE_USER_SHAPE_PROP_TYPE.isRequired,
        globalHeader: PropTypes.node,
        additionalHeaderContent: PropTypes.node,
        footerLinks: PAGE_FOOTER_LINKS_SHAPE_PROP_TYPE,
        showBrand: PropTypes.bool,
        showMarketingLinks: PropTypes.bool,
        hideSearchBar: PropTypes.bool,
        onSearchFocus: PropTypes.func,
    }

    _getHeader() {
        let {
            env,
            request,
            user,
            globalHeader,
            additionalHeaderContent,
            hideSearchBar,
            onSearchFocus,
        } = this.props;
        let header = globalHeader;
        let cookieHeader;

        if (env.isEmbeddedView) {
            return null;
        }

        // NOTE: We need to support retrieving the `user` object via an API
        // request in order to support varnish-cached pages for logged in users.
        // See EB-39986 for more details
        if (isUndefined(header)) {
            header = (
                <ConsumerHeader
                    env={env}
                    request={request}
                    user={user}
                    onSearchSelect={setWindowLocation}
                    hideSearchBar={hideSearchBar}
                    onSearchFocus={onSearchFocus}
                />
            );
        }

        if (env.showCookieHeader) {
            // TODO: this message should be moved to:
            // /eventbrite_design_system/src/molecules/notification/constants.js
            // and used as default values on /eventbrite_design_system/src/molecules/notification/CookieNotification.js
            const cookieMessage = gettext(`
                Eventbrite, and certain approved third parties, use functional, analytical
                and tracking cookies (or similar technologies) to understand your event preferences
                and provide you with a customized experience. By closing this banner
                or by continuing to use Eventbrite, you agree.`);
            const cookiePolicyLink = '/cookies/';

            cookieHeader = (
                <CookieNotification
                    message={cookieMessage}
                    linkHref={cookiePolicyLink}
                    cookieName="acceptedCookieHeader"
                />
            );
        }

        if (additionalHeaderContent || cookieHeader) {
            header = (
                <div>
                    {cookieHeader}
                    {header}
                    {additionalHeaderContent}
                </div>
            );
        }

        return header;
    }

    _getFooter() {
        let {
            env,
            user,
            footer,
            footerLinks,
            showBrand,
            showMarketingLinks,
        } = this.props;

        if (env.isEmbeddedView) {
            return null;
        }

        if (isUndefined(footer) && footerLinks) {
            footer = (
                <CoreFooter
                    serverUrl={env.serverUrl}
                    locales={env.locales}
                    localeInfo={env.localeInfo}
                    isUserAuthenticated={user.isAuthenticated}
                    popularSearches={footerLinks.popularSearches}
                    eventsToPlan={footerLinks.eventsToPlan}
                    thirdFooterColumn={footerLinks.thirdFooterColumn}
                    thirdFooterColumnName={footerLinks.thirdFooterColumnName}
                    countries={footerLinks.countries}
                    showBrand={showBrand}
                    showMinimalLinks={footerLinks.showMinimalLinks}
                    showMarketingLinks={showMarketingLinks}
                    helpLinks={env.helpUrls}
                    onLocaleChange={this._handleLocaleChange.bind(this)}
                />
            );
        }

        return footer;
    }

    _handleLocaleChange(locale) {
        let serverUrl = this.props.env.serverUrl;

        location.href = `${serverUrl}/international/change_locale/?locale=${locale}`;
    }

    render() {
        let {...structurePassThruProps} = this.props;

        if (structurePassThruProps.env.isEmbeddedView) {
            structurePassThruProps = {
                ...structurePassThruProps,
                pageTitle: undefined,
                navItems: undefined,
                sideDrawerDescription: undefined,
            };
        }

        // structurePassThruProps has to be placed last
        // in case of a specific page's need to override
        // header and/or footer
        return (
            <Structure
                header={this._getHeader()}
                footer={this._getFooter()}
                {...structurePassThruProps}
            />
        );
    }
}

const enhancePageStructure = flowRight(
    addOverlayControls,
    addMainControls,
    addFocusDrawerControls
);

export default enhancePageStructure(CoreStructure);
