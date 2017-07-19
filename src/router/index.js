import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import World from '@/components/World'
import Resource from '@/components/Resource'
import Charts from '@/components/Charts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/world',
      name: 'World',
      component: World
    },
    {
      path: '/resource',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    }
  ]
})
