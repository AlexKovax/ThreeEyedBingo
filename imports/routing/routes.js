import React from 'react';
import { mount } from 'react-mounter';

import Layout from '/imports/layouts/Layout.jsx';
import Home from '/imports/ui/Home.jsx';
import Vote from '/imports/ui/Vote.jsx';
import Leaderboard from '../ui/Leaderboard';
import Stats from '../ui/Stats.jsx';
import About from '../ui/About.jsx';


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

FlowRouter.route('/leaderboard', {
    name: 'leaderboard',
    action: function () {
        mount(Layout, { content: <Leaderboard /> });
    }
});

FlowRouter.route('/stats', {
    name: 'stats',
    action: function () {
        mount(Layout, { content: <Stats /> });
    }
});

FlowRouter.route('/about', {
    name: 'about',
    action: function () {
        mount(Layout, { content: <About /> });
    }
});