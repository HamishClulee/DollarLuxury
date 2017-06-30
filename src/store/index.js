import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '@/axios';

Vue.use(Vuex)

console.log("store - index.js")

const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGOUT = "LOGOUT"
const LOGIN_ERROR = "LOGIN_ERROR"

const state = {
	counter: 0,
	pending: false,
	auctions: [],
  userLoggedIn: false,
  loginError: false,
  loginErrorMessage: '',
	user: {
		email: null,
		role: null
	}
}

const getters = {
	getUser: state => { return state.user },
  isUserLoggedIn: state => { return state.userLoggedIn },
  isLoginError: state => { return state.loginError },
  getLoginErrorMessage: state => { return state.loginErrorMessage },
}

const mutations = {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state, user, token) {
      state.pending = false
      state.user.role = user.role
      state.user.email = user.email
      state.userLoggedIn = true
    },
    [LOGOUT] (state) {
      state.user.role = null
      state.user.email = null
      state.userLoggedIn = false
    },
    [LOGIN_ERROR] (state, message) {
      state.loginError = true
      state.loginErrorMessage = message
    }
}

const actions = {
	login({ commit }, creds) {
     commit(LOGIN); // show spinner
     return HTTP.post(
            'login',
            {
                email: creds.email,
                password: creds.password
            }
        ).then(response => {
            localStorage.setItem('id_token', response.data.token)
            console.log("value of response.data.token: " + response.data.token + " , val: response.data.role: " + response.data.role)
            var u = {
            	email: creds.email,
            	role: response.data.role
            }
            commit(LOGIN_SUCCESS, u, response.data.token)
        }).catch(function (e) {
            commit(LOGIN_ERROR, e.response.data.message)
        })
   },
   logout({ commit }) {
     localStorage.removeItem('id_token')
     commit(LOGOUT)
   }
}

export default new Vuex.Store ({
	state,
	getters,
	mutations,
	actions
})