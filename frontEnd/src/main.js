import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'

//var VueCookies = require('vue-cookie');

Vue.config.productionTip = false

Vue.use(VueCookies);

new Vue({
  vuetify,
  router,
  VueCookies,
  render: h => h(App)
}).$mount('#app')
