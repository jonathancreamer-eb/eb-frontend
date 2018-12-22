import React from 'react';
import {mount} from 'enzyme';
import fetchMock from 'fetch-mock';
import {getSpecWrapper} from 'eventbrite_design_system/utils/unitTest';
import GlobalHeader from 'eventbrite_design_system/globalHeader/GlobalHeader';
import DropdownMenu from 'eventbrite_design_system/dropdownMenu/DropdownMenu';
import ConsumerHeader from './index';
import {AUTOCOMPLETE_RESPONSE} from './__fixtures__/fetch_mock_responses';
import {ENV, USER} from '../../fixtures/props';

const REQUEST = {
    path: '/foo',
};

// TODO: find out were to put enzyme fetch mock for functional testing
import EnzymeFetchMock from '../../../../testUtils/enzyme-fetch-mock';


describe('search functional tests', () => {
    it('should render search results when typing in auto-complete field', async() => {
        fetchMock.get(/\/directory\/autocomplete/, AUTOCOMPLETE_RESPONSE);

        let component = mount(<ConsumerHeader env={ENV} request={REQUEST} user={USER} />);
        let enzymeFetchMock = new EnzymeFetchMock(fetchMock, component);

        // wait for the header search input to appear (should already be there)
        expect(await enzymeFetchMock.waitFor('[data-spec="text-input"]'));

        // blur + type search in the input
        enzymeFetchMock.changeValue('input[data-spec="text-input"]', 'foo', true);

        let autocompleteFieldApiPattern = /\/directory\/autocomplete\/\?q=foo/;

        // wait for API call to autocomplete service
        await enzymeFetchMock.waitForApiCall(autocompleteFieldApiPattern, 'GET');

        // verify the correct query was passed
        let eventsApiCalls = enzymeFetchMock.getApiCalls(autocompleteFieldApiPattern, 'GET');

        // assert that there was only a single call to the API
        expect(eventsApiCalls).toHaveLength(1);

        // wait for the auto-complete dropdown to display
        // (although it should've displayed immediately w/ fallback suggestions on focus of search input)
        expect(await enzymeFetchMock.waitFor('[data-spec="autocompletefield-dropdown-content"]'));

        // wait for autocomplete suggestions to have the new content based on the typed search
        expect(
            await enzymeFetchMock.pollFor(
                // find at least one autocomplete list item whose contents match one of the
                // mocked popular queries
                () => {
                    // need to tell enzyme to update after state change occurs as result of API response
                    component.update();

                    return enzymeFetchMock.find('[data-spec="eds-list-item-contents"]').someWhere(
                        (listItemContent) => listItemContent.text().trim() === AUTOCOMPLETE_RESPONSE['popular_queries'][0].name
                    );
                }
            )
        );

        component.unmount();
        fetchMock.restore();
    });
});

describe('header', () => {
    it('should render the search box by default if we are in any page but the root', () => {
        let component = mount(
            <ConsumerHeader
                env={ENV}
                request={REQUEST}
                user={USER}
            />
        );

        expect(component.find(GlobalHeader)).toHaveProp('searchInfo');

        component.unmount();
    });

    it('should not render the search box if we are in the root page', () => {
        let request = {
            ...REQUEST,
            path: '/',
        };
        let component = mount(
            <ConsumerHeader
                env={ENV}
                request={request}
                user={USER}
            />
        );

        expect(component.find(GlobalHeader)).toHaveProp('searchInfo', undefined);

        component.unmount();
    });

    it('should not render the search box when hideSearchBar is true', () => {
        let component = mount(
            <ConsumerHeader
                env={ENV}
                request={REQUEST}
                user={USER}
                hideSearchBar={true}
            />
        );

        expect(component.find(GlobalHeader)).toHaveProp('searchInfo', undefined);

        component.unmount();
    });

    it('should contain the additional menus with organize menu on homepage', () => {
        let request = {
            ...REQUEST,
            path: '/',
        };
        const component = mount(
            <ConsumerHeader
                env={ENV}
                request={request}
                user={USER}
            />
        );
        const menusWrapper = getSpecWrapper(component, 'global-header-menus');

        expect(menusWrapper).toBePresent();

        const menus = menusWrapper.find(DropdownMenu);

        expect(menus).toHaveLength(3);

        component.unmount();
    });

    it('should contain the additional menus with no organize menu out of homepage', () => {
        let request = {
            ...REQUEST,
            path: '/boo',
        };
        const component = mount(
            <ConsumerHeader
                env={ENV}
                request={request}
                user={USER}
            />
        );
        const menusWrapper = getSpecWrapper(component, 'global-header-menus');

        expect(menusWrapper).toBePresent();

        const menus = menusWrapper.find(DropdownMenu);

        expect(menus).toHaveLength(2);

        component.unmount();
    });
});
