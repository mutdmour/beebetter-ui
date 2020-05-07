import Vue from "vue";
import VueRouter from "vue-router";
import FormsList from "../views/FormsList.vue";
import FormEdit from "../views/FormEdit.vue";
import FormView from "../views/FormView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import { isUserIdCookieSet } from "../utils/helpers";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Root",
    component: FormsList
  },
  {
    path: "/forms",
    name: "Forms",
    component: FormsList
  },
  {
    path: "/forms/:name/edit",
    name: "FormEdit",
    component: FormEdit
  },
  {
    path: "/forms/:name",
    name: "Form",
    component: FormView
  },
  {
    path: "/login",
    name: "LogIn",
    component: LoginView
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView
  }
];

const router = new VueRouter({
  routes
});

const isLogInOrSignUp = (path: string): boolean => {
  return path === "/login" || path === "/signup";
};

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserIdCookieSet();
  if (!isLoggedIn && !isLogInOrSignUp(to.path)) {
    next("/login");
  }
  if (isLoggedIn && isLogInOrSignUp(to.path)) {
    next("/");
  } else {
    next();
  }
});

export default router;
