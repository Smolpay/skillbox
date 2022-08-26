import Vue from 'vue';
import App from './App.vue';
import { hi } from './data/hi';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alert(hi.message);
alert(hi.question);
