import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);
Vue.config.productionTip = false


if (process.env.NODE_ENV == 'development') {
  Vue.BASE_URL = Vue.prototype.BASE_URL = '';
} else { // Production
  // en ligne decommenter
  // Vue.BASE_URL = Vue.prototype.BASE_URL = '';
  // commenter en ligne
  Vue.BASE_URL = Vue.prototype.BASE_URL = '/personnel_firebase/';
  
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
