import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vue2Filters from 'vue2-filters'
import router from './router'
Vue.config.productionTip = false
var Bus = new Vue();
export default Bus;
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
Vue.use(Vue2Filters);
