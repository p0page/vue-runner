import Vue from 'vue'
import Runner from '../packages'
import App from './App.vue'

Vue.use(Runner)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
