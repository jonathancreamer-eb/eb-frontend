import React from 'react';
import {mount} from 'enzyme';

import {getSpecWrapper} from 'eventbrite_design_system/utils/unitTest';
import Structure from 'eventbrite_design_system/structure/Structure';
import BaseGlobalHeader from 'eventbrite_design_system/globalHeader/GlobalHeader';

import CoreStructure from '.';
import {ENV, USER, FOOTER_LINKS} from '../../fixtures/props';

import ConsumerHeader from '../ConsumerHeader';
import CoreFooter from '../CoreFooter';
import * as http from 'js-utils/http';
import {stub} from 'js-utils/test';

const REQUEST = {
    path: '/foo',
};

describe('simple cases', () => {
    it('renders a Structure with a ConsumerHeader & no footer by default', () => {
        let component = mount(
            <CoreStructure env={ENV} request={REQUEST} user={USER}>
                Content
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(structure).toBePresent();
        expect(structure).toHaveProp('header');
        expect(structure).toHaveProp('footer', undefined);

        // convert header prop into a enzyme wrapper
        let header = mount(structure.prop('header'));

        // ensure it's a ConsumerHeader by default
        expect(header.type()).toBe(ConsumerHeader);

        // verify props based to CoreStructure got passed to header
        expect(header).toHaveProp('env', ENV);
        expect(header).toHaveProp('request', REQUEST);
        expect(header).toHaveProp('user', USER);

        header.unmount();
        component.unmount();
    });

    it('renders a Structure passing through props to it', () => {
        let children = 'Content';
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
                hasIndependentScrolling={true}
            >
                {children}
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(structure).toHaveProp('children', children);
        expect(structure).toHaveProp('hasIndependentScrolling', true);

        component.unmount();
    });
});

describe('header', () => {
    it('renders a Structure without a header when explicitly turned off', () => {
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
                header={null}
            >
                Content
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(structure).toHaveProp('header', null);

        component.unmount();
    });

    it('renders a Structure with passed in header', () => {
        let header = (<div />);
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
                header={header}
            >
                Content
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(structure).toHaveProp('header', header);

        component.unmount();
    });

    it('renders a Structure with passed in additional header content', () => {
        let additionalHeaderContent = (<div data-spec="mock-additional-header-content" />);
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
                additionalHeaderContent={additionalHeaderContent}
            >
                Content
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(getSpecWrapper(structure, 'mock-additional-header-content')).toBePresent();

        component.unmount();
    });

    it('renders a Structure with default header and without search bar', () => {
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
                hideSearchBar={true}
            >
                Content
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(structure).toHaveProp('header');

        let header = mount(structure.prop('header'));

        expect(header.type()).toBe(ConsumerHeader);

        expect(header).toHaveProp('hideSearchBar', true);

        expect(header.find(BaseGlobalHeader)).toHaveProp('searchInfo', undefined);

        header.unmount();
        component.unmount();
    });
});

describe('header search', () => {
    const VALID_URL_REGEX = /^((http[s]?):\/)?\/?([^:/\s]+)((\/\w+)*\/)([\w-.]+[^#?\s]+)(.*)?(#[\w-]+)?$/;
    let setWindowLocationStub;

    beforeEach(() => {
        setWindowLocationStub = stub(http, 'setWindowLocation');
    });

    afterEach(() => {
        setWindowLocationStub.mockRestore();
    });

    it('checks valid linked URLs', () => {
        const validURL = 'https://www.eventbrite.com/e/39347678967?aff=eac2';
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
            >
                Content
            </CoreStructure>
        );

        let onSearchSelect = component.find('ConsumerHeader').prop('onSearchSelect');

        onSearchSelect(validURL);

        let urlArg = http.setWindowLocation.mock.calls[0][0];

        expect(urlArg).toMatch(VALID_URL_REGEX);

        component.unmount();
    });

    it('checks invalid linked URLs', () => {
        const invalidURL = 'https://www.eventbrite.comhttps//www.eventbrite.com/e/39347678967?aff=eac2';

        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
            >
                Content
            </CoreStructure>
        );

        let onSearchSelect = component.find('ConsumerHeader').prop('onSearchSelect');

        onSearchSelect(invalidURL);

        let urlArg = http.setWindowLocation.mock.calls[0][0];

        expect(urlArg).not.toMatch(VALID_URL_REGEX);

        component.unmount();
    });

    it('checks valid linked paths', () => {
        const validPath = '/e/39347678967?aff=eac2';

        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
            >
                Content
            </CoreStructure>
        );

        let onSearchSelect = component.find('ConsumerHeader').prop('onSearchSelect');

        onSearchSelect(validPath);

        let urlArg = http.setWindowLocation.mock.calls[0][0];

        expect(urlArg).toMatch(VALID_URL_REGEX);

        component.unmount();
    });
});

describe('footer', () => {
    it('renders a Structure with default GlobalFooter when footer links are passed in', () => {
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
                footerLinks={FOOTER_LINKS}
            >
                Content
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(structure).toHaveProp('footer');

        // convert footer prop into an enzyme wrapper
        let footer = mount(structure.prop('footer'));

        // ensure it's a CoreFooter by default
        expect(footer.type()).toBe(CoreFooter);

        // verify props based to CoreStructure got passed to header
        expect(footer).toHaveProp('popularSearches', FOOTER_LINKS.popularSearches);
        expect(footer).toHaveProp('eventsToPlan', FOOTER_LINKS.eventsToPlan);
        expect(footer).toHaveProp('thirdFooterColumn', FOOTER_LINKS.thirdFooterColumn);
        expect(footer).toHaveProp('thirdFooterColumnName', FOOTER_LINKS.thirdFooterColumnName);
        expect(footer).toHaveProp('countries', FOOTER_LINKS.countries);

        component.unmount();
    });

    it('renders a Structure with passed in footer', () => {
        let footer = (<div />);
        let component = mount(
            <CoreStructure
                env={ENV}
                request={REQUEST}
                user={USER}
                footer={footer}
            >
                Content
            </CoreStructure>
        );
        let structure = component.find(Structure);

        expect(structure).toHaveProp('footer', footer);

        component.unmount();
    });
});
