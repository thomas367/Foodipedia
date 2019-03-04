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
  	/*** Login Action ***/ 
  	login({commit}, authData){
  		axios.post('/login',{
  			username: authData.username,
  			password: authData.password
  		})
  		.then(response => {
  			console.log(response);
        if(response.data.success === true){
          commit('authUser', {
            token: response.data.token
          })
          localStorage.setItem('token', response.data.token);
          router.replace('/welcome')
        }
        else if(response.data.success === false){
          //TODO: Message the user there are empty fields

        }
  		})
      .catch(error => {
        console.log(error.response);
      });
  	},
  	/*** Register Action ***/
  	signup({commit}, authData){
      axios.post('/register', {
        username: authData.username,
        password: authData.password,
        password_confirmation :authData.password_confirmation
      })
      .then(response =>{
        console.log(response);
        if(response.data.success === true){
            commit('authUser', {
            token: response.data.token
          })
          localStorage.setItem('token', response.data.token);
          router.replace('/welcome')
        }
        else if(response.data.success === false){
          //TODO: Message the user if there are empty fields or username exists.
        }
      })
      .catch(error =>{
        console.log(error.response);
      });
  	},
  	/*** Logout Action ***/
  	logout({commit}){
  		commit('clearAuthData')
      localStorage.removeItem('token')
      router.replace('/welcome')
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