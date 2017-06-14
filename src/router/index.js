import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import World from '@/components/World'
import Resource from '@/components/Resource'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
