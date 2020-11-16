import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Forgot from '../views/Forgot.vue'
import Administrator from '../views/Administrator.vue'
// import AdminApplicant from '../views/AdminApplicant.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/forgot',
    component: Forgot
  },
  {
    path: '/admin/home',
    component: Administrator
  },
  // Still need to add the dynamic routes
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router