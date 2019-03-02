import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import WelcomePage from './components/welcome.vue'
import SigninPage from './components/auth/signin.vue'
import SignupPage from './components/auth/signup.vue'
import MyRecipesPage from './components/myRecipes.vue'
import RecipeFormPage from './components/recipeForm.vue'
import ShowRecipe from './components/showRecipe.vue'

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
    },
    {
      path: '/showRecipe',
      component: ShowRecipe
    },
    {
      path: '/myRecipes',
      component: MyRecipesPage,  
      beforeEnter(to, from, next){
        if(store.state.idToken){
          next()
        }
        else{
          next('/signin')
        }
      }
    },
    {
      path: '/recipeForm',
      component: RecipeFormPage
      /*
      beforeEnter(to, from, next){
        if(store.state.idToken){
          next()
        }
        else{
          next('/signin')
        }
      }
      */
    }
  ]
})