import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const state = {
	counter: 0,
	pending: false,
	auctions: [],
	isLoggedIn: !!localStorage.getItem('id_token'),
	user: {
		email: null,
		role: null
	}
}

const getters = {
	getUser: state => state.user
}

const mutations = {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state, user) {
      state.pending = false
      state.user.role = user.role
      state.user.email = user.email
    },
    [LOGOUT](state) {
      state.user.role = null
      state.user.email = null
    }
}

const actions = {
	login({ commit }, creds) {
     commit(LOGIN); // show spinner
     return axios.post(
            'http://localhost:8080/login',
            {
                email: creds.email,
                password: creds.password
            }
        ).then(response => {
            localStorage.setItem('id_token', response.data.token)
            console.log("Logged from auth.js: signin(): value of response.data.token: " + response.data.token + " , val: response.data.role: " + response.data.role)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
            var u = {
            	email: creds.email,
            	role: response.data.role
            }
            commit(LOGIN_SUCCESS, u)
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