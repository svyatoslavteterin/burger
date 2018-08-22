import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('Rub', (value) => {
  const valueRub = parseInt(value, 10);
  const IconRub = '&nbsp;&#8381;';
  return valueRub + IconRub;
});

// store.subscribe((mutation, state) => {
//   localStorage.setItem('store', JSON.stringify(state));
// });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
