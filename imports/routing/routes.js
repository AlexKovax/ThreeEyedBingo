import React from 'react';
import { mount } from 'react-mounter';

import Layout from '/imports/layouts/Layout.jsx';
import Home from '/imports/ui/Home.jsx';

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        mount(Layout, { content: <Home /> });
    }
});
