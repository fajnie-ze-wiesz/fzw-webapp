import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// In abstract router mode we must set the initial location explicitly:
/// https://github.com/vuejs/vue-router/issues/729
router.replace('/');
