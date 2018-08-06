import { controller, get, HttpController } from "@eventbrite/brite-server";
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { App } from "../../app/index";
import { Layout } from "../../app/layouts";

@controller()
export class DemoController extends HttpController {
    @get("/")
    public show() {
        this.json({
            foo: 'bar',
        });
    }

    @get("/foo/:id")
    public async foo() {
        this.json({
            fakeLoggedInUser: {
                user: this.context.user.id,
            },
            foo: `bar ${this.request.params.id}`,
        });
    }

    @get("/ssr")
    public ssr() {
        const app = renderToString(React.createElement(App));
        const layout = renderToStaticMarkup(React.createElement(Layout, { body: app }));

        this.html(layout);
    }
}