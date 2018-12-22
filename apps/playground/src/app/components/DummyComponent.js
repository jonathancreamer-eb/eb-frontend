import React, {PureComponent} from 'react';
import Icon from 'eventbrite_design_system/icon/Icon';

export default class DummyComponent extends PureComponent {
    render() {
        return (<Icon type="boogie">I'm a dynamically loaded icon!</Icon>);
    }
}
