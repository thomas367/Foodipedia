import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
  		axios.post('http://localhost:8000/api/login',{
  			username: authData.username,
  			password: authData.password
  		})
  		.then(response => {
  			//console.log(response);
        commit('authUser', {
          token: response.data.token
        })
        localStorage.setItem('token', response.data.token);
  		})
      .catch(error => {
        console.log(error.response);
      });
  	},
  	/*** Register Action ***/
  	signup({commit}, authData){
      axios.post('http://localhost:8000/api/register', {
        username: authData.username,
        password: authData.password,
        confirmPassword :authData.confirmPassword
      })
      .then(response =>{
          //console.log(response);
          commit('authUser', {
          token: response.data.token
        })
        localStorage.setItem('token', response.data.token);
      })
      .catch(error =>{
        console.log(error.response);
      });
  	},
  	/*** Logout Action ***/
  	logout({commit}){
  		commit('clearAuthData')
      localStorage.removeItem('token')
      /*** router.replace('/welcome') ***/
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
  }
})
