import Vue from 'vue';
import Router from 'vue-router';
import Intro from '@/components/Intro';
import Quest from '@/components/Quest';
import Results from '@/components/Results';
import ShareResults from '@/components/ShareResults';

Vue.use(Router)

export default new Router({
  mode: 'abstract',
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro,
    },
    {
      path: '/quest',
      name: 'Quest',
      component: Quest,
    },

    {
      path: '/results',
      name: 'Results',
      component: Results,
    },

    {
      path: '/share-results',
      name: 'ShareResults',
      component: ShareResults,
    },
  ]
})
