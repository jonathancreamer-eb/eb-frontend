import React from 'react';
import PropTypes from 'prop-types';
import {throttle} from 'lodash';

import BaseGlobalHeader from 'eventbrite_design_system/globalHeader/GlobalHeader';

import * as pageConstants from '../../prop-types';
import * as utils from './utils';
import {FALLBACK_SUGGESTIONS} from './constants';
import {getSuggestions} from './utils/search';
import {isHomepage} from '../../analytics/utils';

const SEARCH_SUGGESTIONS_THROTTLE_AMOUNT = 300;
const getSuggestionsThrottled = throttle(getSuggestions, SEARCH_SUGGESTIONS_THROTTLE_AMOUNT);

export default class ConsumerHeader extends React.Component {
    static propTypes = {
        env: pageConstants.PAGE_ENV_SHAPE_PROP_TYPE.isRequired,
        request: pageConstants.PAGE_REQUEST_SHAPE_PROP_TYPE.isRequired,
        user: pageConstants.PAGE_USER_SHAPE_PROP_TYPE.isRequired,
        onSearchSelect: PropTypes.func,
        hideSearchBar: PropTypes.bool,
        onSearchFocus: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            searchQuery: props.env.searchQuery || '',
            searchSuggestions: FALLBACK_SUGGESTIONS,
        };
    }

    _handleSearchChange(searchQuery) {
        if (!this.props.onSearchFocus) {
            getSuggestionsThrottled(searchQuery)
                .then((searchSuggestions) => {
                    this.setState({searchQuery, searchSuggestions});
                });
        }
    }

    render() {
        let {env, request, user, onSearchSelect, hideSearchBar, onSearchFocus} = this.props;
        let {searchQuery, searchSuggestions} = this.state;
        let {serverUrl, adminServerUrl, signupUrl, loginUrl, logoutUrl, helpUrls, organizeUrls, ebDomain, isNewAccountSettingsActive} = env;
        let {path: requestPath} = request;
        let {isAuthenticated, canCreateEvents} = user;
        let additionalMenus = [utils.getHelpMenu(helpUrls, requestPath)];

        if(isHomepage(requestPath)){
            additionalMenus = [utils.getOrganizeMenu(organizeUrls, requestPath), ...additionalMenus];
        }

        return (
            <BaseGlobalHeader
                logoInfo={utils.getLogoInfo(serverUrl, requestPath)}
                searchInfo={utils.getSearchInfo(serverUrl, requestPath, searchQuery, searchSuggestions, hideSearchBar)}
                quickLinks={utils.getBrowseEventsQuickLinks(serverUrl, ebDomain, requestPath)}
                userMenuInfo={utils.getUserMenuInfo({serverUrl, adminServerUrl, logoutUrl, requestPath, user, isNewAccountSettingsActive, showBrowseEvents: hideSearchBar})}
                additionalMenus={additionalMenus}
                nonUserQuickLinks={utils.getNonUserQuickLinks(requestPath, isAuthenticated, signupUrl, loginUrl)}
                callToActionInfo={utils.getCreateEventCTA(serverUrl, ebDomain, requestPath, isAuthenticated, canCreateEvents)}
                onSearchChange={this._handleSearchChange.bind(this)}
                onSearchSelect={onSearchSelect}
                onSearchFocus={onSearchFocus}
            />
        );
    }
}
