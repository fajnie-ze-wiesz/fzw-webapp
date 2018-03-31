import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Guide from '@/components/Guide'
import Quest from '@/components/Quest'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  mode: 'abstract',
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },

    {
      path: '/quest',
      name: 'Quest',
      component: Quest
    },

    {
      path: '/results',
      name: 'Results',
      component: Results
    }
  ]
})
