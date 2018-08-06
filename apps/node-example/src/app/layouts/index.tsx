import React from "react";

export const Layout = ({
    body,
}) => (
    <html>
    <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: body }}></div>
    </body>
    </html>
)