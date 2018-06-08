import Vue from 'vue';
import VueRouter from 'vue-router';
import FastClick from 'fastclick';

import App from './App.vue';
import routes from './routes';
import {get} from 'lodash';

import 'normalize.css/normalize.css';
import './styles/index.css';

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

Vue.config.productionTip = false;
Vue.prototype.$lodash = {get};
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
