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
    /*** On refresh page keeps the user connected ***/
    keepLogin({commit}){
      const token = localStorage.getItem('token')
      /* Check if there is a token */
      if(!token){
        commit('clearAuthData')
        localStorage.removeItem('token')
        localStorage.removeItem('expirationDate')
        router.replace('/signin')
      } 
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date();
      /* Check if the token has expired */
      if(now >= expirationDate){
        commit('clearAuthData')
        localStorage.removeItem('token')
        localStorage.removeItem('expirationDate')
        router.replace('/signin')
      }
      commit('authUser', {
        token: token
      })
    },
    /*** Set user state on successful login or register ***/
    setUserState({commit}, payload){
      commit('authUser', {
        token: payload.token
      }) 
      const now = new Date();
      const expirationDate = new Date(now.getTime() + payload.expiresIn * 1000);
      localStorage.setItem('token', payload.token);
      localStorage.setItem('expirationDate', expirationDate);
      router.replace('/');
    },
  	/*** Logout Action ***/
  	logout({commit}){
  		commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
      router.replace('/')
  	}
  },
  getters: {
    isAuthenticated (state){
      return state.idToken !== null 
    }
  } 
})