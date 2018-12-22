import React from 'react';
import PropTypes from 'prop-types';
import GlobalFooter from 'eventbrite_design_system/globalFooter/GlobalFooter';
import Illustration from 'eventbrite_design_system/illustration/Illustration';
import * as pageConstants from '../../prop-types';
import * as utils from './utils';
import MarketingSection from './MarketingSection';


export default class CoreFooter extends React.Component {
    static propTypes = {
        serverUrl: PropTypes.string.isRequired,
        locales: pageConstants.PAGE_LOCALES_ARRAY_PROP_TYPE.isRequired,
        localeInfo: pageConstants.PAGE_LOCALE_INFO_SHAPE_PROP_TYPE.isRequired,
        popularSearches: pageConstants.FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
        eventsToPlan: pageConstants.FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
        thirdFooterColumn: pageConstants.FOOTER_LINKS_DATA_SHAPE_PROP_TYPE.isRequired,
        thirdFooterColumnName: PropTypes.string.isRequired,
        countries: pageConstants.FOOTER_COUNTRIES_ARRAY_PROP_TYPE.isRequired,
        helpLinks: pageConstants.FOOTER_HELP_LINKS_PROP_TYPE.isRequired,
        onLocaleChange: PropTypes.func,
        isUserAuthenticated: PropTypes.bool,
        showMinimalLinks: PropTypes.bool,
        showMarketingLinks: PropTypes.bool,
        showBrand: PropTypes.bool,
    };

    render() {
        let {
            thirdFooterColumn,
            thirdFooterColumnName,
            eventsToPlan,
            serverUrl,
            locales,
            localeInfo,
            helpLinks,
            onLocaleChange,
            popularSearches,
            showBrand,
            showMinimalLinks,
            showMarketingLinks,
        } = this.props;

        let generalLinks;
        let brandSection;
        let marketingSection;
        let formattedLocales;

        if (showMinimalLinks) {
            generalLinks = utils.getMinimalGeneralLinks(serverUrl);
        } else {
            generalLinks = utils.getGeneralLinks(serverUrl, localeInfo, helpLinks);
        }

        if (showBrand) {
            brandSection = (<Illustration type="brand-super-crop" width="100%" height="auto" />);
        }

        if (showMarketingLinks) {
            marketingSection = (
                <MarketingSection
                    serverUrl={serverUrl}
                    popularSearches={popularSearches}
                    eventsToPlan={eventsToPlan}
                    thirdFooterColumn={thirdFooterColumn}
                    thirdFooterColumnName={thirdFooterColumnName}
                    localeInfo={localeInfo}
                />
            );
        }

        formattedLocales = utils.getLocales(locales);

        return (
            <GlobalFooter
                generalLinks={generalLinks}
                locales={formattedLocales}
                currentLocale={localeInfo.locale}
                onLocaleChange={onLocaleChange}
                brandSection={brandSection}
                flexibleSection={marketingSection}
            />
        );
    }
}
