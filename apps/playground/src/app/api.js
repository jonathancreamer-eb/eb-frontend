import _ from 'lodash';
import {ICON_TYPES} from 'eventbrite_design_system/icon/constants';

const _getRandomIcons = (count = 3) => (
    _.range(count).map(() => ICON_TYPES[_.random(ICON_TYPES.length - 1)])
);

export const fetchIcons = (count) => (
    new Promise((resolve) => setTimeout(() => resolve(_getRandomIcons(count)), _.random(2000)))
);
