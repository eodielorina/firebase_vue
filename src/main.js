import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.min.css";
import '@fortawesome/fontawesome-free/js/all.js';
import NwImg from 'nw-img-vue';
import './registerServiceWorker';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

Vue.use(NwImg);
Vue.use(BootstrapVue);

Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
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
