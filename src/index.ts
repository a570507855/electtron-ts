import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
const app = new Vue({
  render: (h) => h(App),
}).$mount('#app');
