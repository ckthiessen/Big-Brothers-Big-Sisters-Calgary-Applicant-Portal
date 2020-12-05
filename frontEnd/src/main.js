import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import firebase from 'firebase'

//var VueCookies = require('vue-cookie');

Vue.config.productionTip = false

firebase.initializeApp({
    apiKey: "AIzaSyCKv8JlZisXPsuu3RMIpY3o13OCZ8h65A8",
    authDomain: "bbbs-applicant-portal.firebaseapp.com",
    databaseURL: "https://bbbs-applicant-portal.firebaseio.com",
    projectId: "bbbs-applicant-portal",
    storageBucket: "bbbs-applicant-portal.appspot.com",
    messagingSenderId: "4468871993",
    appId: "1:4468871993:web:97201aa3c2304e07080ee8",
    measurementId: "G-PERE0FG5PD"
});

Vue.use(VueCookies);

new Vue({
  vuetify,
  router,
  VueCookies,
  render: h => h(App)
}).$mount('#app')
