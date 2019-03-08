import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'

axios.defaults.baseURL = 'http://localhost:8000/api'

Vue.use(VeeValidate)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
