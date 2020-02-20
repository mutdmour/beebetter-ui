import Vue from 'vue'
import VueRouter from 'vue-router'
import Forms from '../views/Forms.vue'
import FormEdit from '../views/FormEdit.vue'
import Form from '../views/Form.vue'

Vue.use(VueRouter)

const routes = [
 {
  path: '/',
  name: 'Forms',
  component: Forms,
 },
 {
  path: '/forms',
  name: 'Forms',
  component: Forms,
 },
 {
  path: '/forms/:name/edit',
  name: 'FormEdit',
  component: FormEdit,
 },
 {
  path: '/forms/:name',
  name: 'Form',
  component: Form,
 },
]

const router = new VueRouter({
 routes,
})

export default router
