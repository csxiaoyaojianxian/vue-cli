import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/layouts/default'),
      children: [
        { path: '/', component: () => import('./views/pageDashboard/Dashboard') },
        { path: 'index', component: () => import('./views/pageDashboard/Dashboard') },
        { path: 'dashboard', component: () => import('./views/pageDashboard/Dashboard') },
        { path: 'content/forum', component: () => import('./views/pageContent/Forum') },
        { path: 'content/thread', component: () => import('./views/pageContent/Thread') },
        { path: 'content/post', component: () => import('./views/pageContent/Post') },
        { path: 'content/thumb', component: () => import('./views/pageContent/Thumb') },
        { path: 'content/comment', component: () => import('./views/pageContent/Comment') },
        { path: 'user', component: () => import('./views/pageUser/User') },
        { path: 'auth', component: () => import('./views/pageAuth/Auth') }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404')
    },
    { // Always leave this as last one
      path: '*',
      component: () => import('./views/404')
    }
  ]
})
