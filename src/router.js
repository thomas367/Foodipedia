import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import WelcomePage from './components/welcome.vue'
import SigninPage from './components/auth/signin.vue'
import SignupPage from './components/auth/signup.vue'
import MyRecipesPage from './components/myRecipes.vue'
import RecipeFormPage from './components/recipeForm.vue'
import ShowRecipe from './components/showRecipe.vue'
import SearchRecipes from './components/searchRecipes.vue'

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
      path: '/showRecipe/:id',
      name: 'showRecipe',
      props: true,
      component: ShowRecipe
    },
    {
      path: '/searchRecipes/:keyword',
      name: 'searchRecipes',
      props: true,
      component: SearchRecipes
    },
    {
      path: '/myRecipes',
      component: MyRecipesPage,  
      beforeEnter(to, from, next){
        if(localStorage.getItem('token')){
          next()
        }
        else{
          next('/signin')
        }
      }
    },
    {
      path: '/recipeForm',
      name: 'recipeForm',
      props:true,
      component: RecipeFormPage,  
      beforeEnter(to, from, next){
        if(localStorage.getItem('token')){
          next()
        }
        else{
          next('/signin')
        }
      }
    }
  ]
})