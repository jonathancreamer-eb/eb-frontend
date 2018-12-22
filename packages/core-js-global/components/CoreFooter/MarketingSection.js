import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as pageConstants from '../../prop-types';
import {getMainSections} from './utils';

const _getMarketingLinkItems = (links = []) => (
    links.map(({content, url, additionalClassName = '', ...linkProps}) => {
        let className = classnames(
            'eds-global-footer__link',
            {
                [additionalClassName]: additionalClassName,
            }
        );

        return (
            <li key={content}>
                <a href={url} {...linkProps} className={className}>
                    {content}
                </a>
            </li>
        );
    })
);

const _getMarketingLinks = (linkTypes) => (
    linkTypes.map(({title, links}) => (
        <div key={title} className="eds-g-cell eds-g-cell-3-12 eds-l-pad-left-6 eds-l-pad-top-4">
            <h3 className="eds-l-pad-vert-2">{title}</h3>
            <ul className="eds-l-pad-vert-2 eds-l-mar-all-0 eds-l-pad-hor-0">
                {_getMarketingLinkItems(links)}
            </ul>
        </div>
    ))
);

export default class MarketingSection extends React.Component {
    static propTypes = {
        serverUrl: PropTypes.string.isRequired,
        localeInfo: pageConstants.PAGE_LOCALE_INFO_SHAPE_PROP_TYPE.isRequired,
        popularSearches: pageConstants.FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
        eventsToPlan: pageConstants.FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
        thirdFooterColumn: pageConstants.FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
        thirdFooterColumnName: PropTypes.string.isRequired,
    };

    render() {
        let {
            localeInfo,
            serverUrl,
            popularSearches,
            eventsToPlan,
            thirdFooterColumn,
            thirdFooterColumnName,
        } = this.props;

        let marketingLinks = _getMarketingLinks(
            getMainSections(serverUrl, localeInfo, popularSearches, eventsToPlan, thirdFooterColumn, thirdFooterColumnName)
        );

        return (
            <div className="eds-bg-color--grey-900 eds-hide-sw eds-hide-sm eds-hide-sn">
                {marketingLinks}
            </div>
        );
    }
}
