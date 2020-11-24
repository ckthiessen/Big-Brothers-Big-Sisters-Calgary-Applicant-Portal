/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Forgot from '../views/Forgot.vue'
import Administrator from '../views/Administrator.vue'
import ApplicantPortal from '../views/ApplicantPortal.vue'
//import AdminApplicant from '../views/AdminApplicant.vue'

//import firebase
/*
import * as firebase from 'firebase';
import 'firebase/auth'
*/
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
  {
    path: '/applicant/',
    component: ApplicantPortal
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

// router.beforeEach((to, from, next) => {
//   //Adds this logic to check whether each route is authenticated
//   //this guards users from accessing certain routes ex: Admin/ Applicant dashboard etc
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const isAdmin = to.matched.some(record => record.meta.isAdmin);
<<<<<<< HEAD
//   //Add firebase logic here
//   /*
//   const isAuthenticated = firebase.auth().currentUser;
//   const hasAdminPerms = firebase.auth().currentUser.isAdmin === true;
=======
  //Add firebase logic here
  /*
  const isAuthenticated = firebase.auth().currentUser;
  const hasAdminPerms = firebase.auth().currentUser.isAdmin === true;
>>>>>>> 2e82c295c904bc0fd4ab6c29f2b67ba3e9b075bd

//   if(requiresAuth & !isAutheticated){
//     next("/signin");
//   }else{
//     next()
//   }

//   if(requiresAdminPerm & !hasAdminPerm) {
//     next("/signin");
//   }else{
//     next()
//   }
//   */

<<<<<<< HEAD
// })
=======
// //
>>>>>>> 2e82c295c904bc0fd4ab6c29f2b67ba3e9b075bd

export default router