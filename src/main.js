import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'ionicons/dist/css/ionicons.min.css'

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
