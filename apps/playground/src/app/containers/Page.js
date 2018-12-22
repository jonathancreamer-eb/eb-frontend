import React, {PureComponent} from 'react';

import {
    CoreStructure,
    PAGE_ENV_SHAPE_PROP_TYPE,
    PAGE_REQUEST_SHAPE_PROP_TYPE,
    PAGE_USER_SHAPE_PROP_TYPE,
    PAGE_FOOTER_LINKS_SHAPE_PROP_TYPE
} from '../../../../../packages/core-js-global';
import Icon from 'eventbrite_design_system/icon/Icon';
import Button from 'eventbrite_design_system/button/Button';
import AsyncComponent from '../components/AsyncComponent';
import {fetchIcons} from '../api';
import {ICONS_PROP_TYPE} from '../constants';

import {formatMajorMoney} from 'js-utils/intl';
import moment from 'js-utils/moment';
import lazyGettext from 'js-utils/lazy-gettext';
import momentTimezone from 'js-utils/moment-timezone';
import logger from 'js-utils/logger';

const MESSAGE = lazyGettext('Free');
const NUM_ICONS = 3;

/*
 * This is a dummy React app that's a playground where we can develop and test
 * new features without breaking existing apps.
 */
export default class PlaygroundPage extends PureComponent {
    static propTypes = {
        env: PAGE_ENV_SHAPE_PROP_TYPE.isRequired,
        request: PAGE_REQUEST_SHAPE_PROP_TYPE.isRequired,
        user: PAGE_USER_SHAPE_PROP_TYPE.isRequired,
        footerLinks: PAGE_FOOTER_LINKS_SHAPE_PROP_TYPE.isRequired,
        initialIcons: ICONS_PROP_TYPE.isRequired,
    }

    static defaultProps = {
        initialIcons: [],
    };

    constructor(props) {
        super(props);

        this.state = {
            icons: props.initialIcons,
            isLoading: false,
        };
    }

    componentDidMount() {
        logger.info('Playground page loaded', {foo: 'bar'});
    }

    _handleFetchIcons = () => {
        this.setState({isLoading: true});
        fetchIcons(NUM_ICONS)
            .then((icons) => {
                this.setState({
                    icons,
                    isLoading: false,
                });
            });
    }

    render() {
        const {
            env,
            request,
            user,
            footerLinks,
        } = this.props;
        const {isLoading, icons} = this.state;
        const iconComponents = icons.map((iconType) => (
            <Icon
                key={iconType}
                type={iconType}
                size="xlarge"
                color="ui-orange"
            />
        ));

        return (
            <CoreStructure
                env={env}
                request={request}
                user={user}
                footerLinks={footerLinks}
                isLoading={isLoading}
            >
                <div className="icon-container" data-spec="icon-container">
                    <div className="icon-container__boast">
                        <h2>We&#39;ve got the best icons in town!!</h2>
                    </div>
                    <div className="icon-container__icons">
                        {iconComponents}
                    </div>
                    <div>
                        <Button style="fill" onClick={this._handleFetchIcons}>Fetch new icons</Button>
                    </div>
                </div>
                <div>
                    <h3><code>formatMajorMoney</code> test: {formatMajorMoney(52124, 'USD', env.currencyFormat)}</h3>
                    <h3><code>moment</code> test: {moment().year()}</h3>
                    <h3><code>moment with timezone</code> test: {momentTimezone('2017-10-18T12:00:00Z').tz('America/Los_Angeles').format('ha z')}</h3>
                    <h3><code>lazyGettext</code> test: {MESSAGE}</h3>
                    <AsyncComponent />
                </div>
            </CoreStructure>
        );
    }
}
