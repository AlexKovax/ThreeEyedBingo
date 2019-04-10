import React from 'react';
import { mount } from 'react-mounter';

import Layout from '/imports/layouts/Layout.jsx';
import Home from '/imports/ui/Home.jsx';
import Vote from '/imports/ui/Vote.jsx';

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        mount(Layout, { content: <Home /> });
    }
});

FlowRouter.route('/vote/:slug', {
    name: 'vote',
    action: function (params) {
        mount(Layout, { content: <Vote slug={params.slug} /> });
    }
});
