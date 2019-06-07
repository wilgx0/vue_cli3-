import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Navigator from '../../common/navigator.js'


Vue.config.productionTip = false

Vue.prototype.$openRouter = Navigator.openRouter


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')