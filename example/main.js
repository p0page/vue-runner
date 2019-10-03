import Vue from 'vue'
// import Runner from '../src'
import App from './App.vue'

// Vue.use(Runner)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
