import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import VueCookies from 'vue-cookies'
import "./firebase"
import { auth } from "./firebase";

//Disable "You are running Vue in development mode" warning
Vue.config.productionTip = false;

// Vue.use(VueCookies);
//this will prevent user from being logged out on page refresh
let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      // VueCookies,
      render: h => h(App)
    }).$mount('#app')
  }
})