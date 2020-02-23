import Vue from 'vue'
import VueRouter from 'vue-router'
import FormsList from '../views/FormsList.vue'
import FormEdit from '../views/FormEdit.vue'
import FormView from '../views/FormView.vue'

Vue.use(VueRouter)

const routes = [
 {
  path: '/forms',
  name: 'Forms',
  component: FormsList,
 },
 {
  path: '/forms/:name/edit',
  name: 'FormEdit',
  component: FormEdit,
 },
 {
  path: '/forms/:name',
  name: 'Form',
  component: FormView,
 },
]

const router = new VueRouter({
 routes,
})

export default router
