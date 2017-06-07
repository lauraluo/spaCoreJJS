import React from 'react';
import { renderToString } from 'react-dom/server';
// import { createMemoryHistory } from 'history';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import Index from './components/index/Root';

export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {
        const app = (
			<Index/>
        );
		
        renderToString(app);

        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app)
                // globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
