import React, {PureComponent} from 'react';
import Button from 'eventbrite_design_system/button/Button';


export default class AsyncComponent extends PureComponent {
    state = {
        Component: null,
    }

    /* eslint-disable */
    _handleLoad = () => {
        return import('./DummyComponent').then((Component) => {
            this.setState({Component: Component.default});
        });
    }
    /* eslint-enable */

    render() {
        const {Component} = this.state;

        if (Component) {
            return <Component {...this.props} />;
        }

        return (<Button onClick={this._handleLoad}>Click to load some dynamic content!</Button>);

    }
}
