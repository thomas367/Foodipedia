import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from './components/welcome.vue'
import SigninPage from './components/auth/signin.vue'
import SignupPage from './components/auth/signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: WelcomePage
    },

    {
      path: '/signin',
      component: SigninPage
    },

    {
      path: '/signup',
      component: SignupPage
    }
  ]
})
