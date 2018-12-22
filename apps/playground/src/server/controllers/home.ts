import { controller, get, HttpController } from '@eventbrite/brite-server';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { App } from '../../app/app';
import { Layout } from '../../app/layouts';
import { HomViewModel } from '../viewModels/homeViewModel';

@controller()
export class DemoController extends HttpController {
    @get('/')
    public show() {
        this.json({
            foo: 'bar',
        });
    }

    @get('/foo/:id')
    public async foo() {
        this.json({
            fakeLoggedInUser: {
                user: this.context.user.id,
            },
            foo: `bar ${this.request.params.id}`,
        });
    }

    @get('/ssr')
    public ssr() {
        this.clearCache();

        const initialState = {
            ...HomViewModel,
        };

        const app = renderToString(React.createElement(App, initialState));
        const layout = renderToStaticMarkup(
            React.createElement(Layout, { body: app })
        );

        this.html(layout);
    }

    private clearCache() {
        for (const path in require.cache) {
            if (path.endsWith('.js')) {
                // only clear *.js, not *.node
                delete require.cache[path];
            }
        }
    }
}
