import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	idToken: null

  },
  mutations: {
  	authUser(state, userData){
  		state.idToken = userData.token
  	},
  	clearAuthData(state){
  		state.idToken = null
  	}
  },
  actions: {
    /* Set user state on successful login or register */
    setUserState({commit}, token){
      commit('authUser', {
        token: token
      })
      localStorage.setItem('token', token);
      router.replace('/')
    },
  	/*** Logout Action ***/
  	logout({commit}){
  		commit('clearAuthData')
      localStorage.removeItem('token')
      router.replace('/')
  	},
  	/*** On refresh page keeps the user connected ***/
  	keepLogin({commit}){
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      commit('authUser', {
        token: token
      })
  	}
  },
  getters: {
    isAuthenticated (state){
      return state.idToken !== null 
    }
  } 
})