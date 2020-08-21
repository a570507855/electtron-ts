import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Vue from 'vue';
import App from './App.vue';
const myUser32 = require('./dll/index');

console.log(myUser32)
const app = new Vue({
  render: h => h(App)
}).$mount('#app')


