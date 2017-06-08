import React from 'react';
import { renderToString } from 'react-dom/server';
// import { createMemoryHistory } from 'history';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import Index from './script/components/index/Root';

export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {

        const app = (
			<Index msg={params.data.msg} />
        );
		
        renderToString(app);

        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app),
                globals: { initDatas: params.data.msg }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
