import React from 'react';

const Layout = ({
    body,
}) => (
    <html>
    <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: body }}></div>
        <script src='/assets/app.js'></script>
    </body>
    </html>
)

export default Layout;