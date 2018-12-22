import React from 'react';
import {mount} from 'enzyme';
import fetchMock from 'fetch-mock';
// TODO: find out were to put enzyme fetch mock for functional testing
import EnzymeFetchMock from '../../testUtils/enzyme-fetch-mock';

import App from './App';
import {ENV, USER, FOOTER_LINKS} from '../../packages/core-js-global/fixtures/props';
import Icon from 'eventbrite_design_system/icon/Icon';

const REQUEST = {path: ''};
const DUMMY_ICONS = ['friends', 'teepee', 'rocket'];

describe('basic rendering', () => {
    it('renders expected icons', async() => {
        let component = mount(
            <App
                env={ENV}
                request={REQUEST}
                user={USER}
                footerLinks={FOOTER_LINKS}
                initialIcons={DUMMY_ICONS}
            />
        );
        let enzymeFetchMock = new EnzymeFetchMock(fetchMock, component);

        // wait for the icon container to appear (should already be there)
        expect(await enzymeFetchMock.waitFor('[data-spec="icon-container"]'));

        let iconContainer = enzymeFetchMock.find('[data-spec="icon-container"]');
        let icon = iconContainer.find(Icon);

        expect(icon).toHaveLength(DUMMY_ICONS.length);

        DUMMY_ICONS.forEach((iconType, index) => {
            expect(icon.at(index)).toHaveProp('type', iconType);
        });

        component.unmount();
        fetchMock.restore();
    });
});
