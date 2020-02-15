import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Forms from '../views/Forms.vue'
import FormEdit from '../views/FormEdit.vue'

Vue.use(VueRouter)

const routes = [
 {
  path: '/',
  name: 'Home',
  component: Home,
 },
 {
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
 },
 {
  path: '/forms',
  name: 'Forms',
  component: Forms,
 },
 {
   path: '/forms/:name/edit',
   name: 'FormEdit',
   component: FormEdit
 }
]

const router = new VueRouter({
 routes,
})

export default router
