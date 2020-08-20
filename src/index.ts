import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Vue from 'vue';
import App from './App.vue';
require('./vue-test/vue-test')

new Vue({
  render: h => h(App)
}).$mount('#app');