import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import "./firebase"
// import { auth } from "./firebase";

Vue.config.productionTip = false;

Vue.use(VueCookies);

// let app;

// auth.onAuthStateChanged(async user => {
//   console.log(user);
//   if (!app) {
//     app = new Vue({
//       vuetify,
//       router,
//       VueCookies,
//       render: h => h(App)
//     }).$mount('#app')
//   }
// })

new Vue({
  vuetify,
  router,
  VueCookies,
  render: h => h(App)
}).$mount('#app')