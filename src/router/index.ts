import Vue from 'vue'
import VueRouter from 'vue-router'
import FormsList from '../views/FormsList.vue'
import FormEdit from '../views/FormEdit.vue'
import FormView from '../views/FormView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

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
 {
  path: '/login',
  name: 'LogIn',
  component: LoginView,
 },
 {
  path: '/signup',
  name: 'Signup',
  component: SignupView,
 },
]

const router = new VueRouter({
 routes,
})

export default router
