import React from 'react';
import {render} from 'react-dom';
import App from './App';
// import {trackInitialPageView} from '../../packages/core-js-global';


// retrieve data from server to hydrate the client
const props = window.__SERVER_DATA__ || {};

export { App };

// render(
//     <App {...props} />,
//     document.getElementById('root')
// );
// trackInitialPageView(props.gaSettings);
