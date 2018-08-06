import React from 'react';
import { hydrate } from 'react-dom';
import path from 'path';

const App = require(path.join(process.cwd(), './src/app/index.tsx'));

hydrate(<App />, document.querySelector('#app'));