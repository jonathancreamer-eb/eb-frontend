import React from 'react';

export const Layout = ({ body }) => (
    <html>
        <head>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdn.evbstatic.com/s3-build/33398-rc2018-12-19_16.04-384d248/js/node_modules/eventbrite_design_system/css/eds.css"
            />
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
        </body>
    </html>
);
