import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '@/axios';

Vue.use(Vuex)

const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGOUT = "LOGOUT"
const LOGIN_ERROR = "LOGIN_ERROR"
const SET_HTTP_ERROR = "SET_HTTP_ERROR"

const state = {
	counter: 0,
	pending: false,
	auctions: [],
  userLoggedIn: false,
  loginError: false,
  loginErrorMessage: '',
	user: {
		email: null,
		role: null,
    accountBalance: 0,
    totalBidsMade: 0
	},
  currentAuction: {
    id: 0,
    name: '',
    shortDescription: '',
    longDescription: '', 
    imagePath: '',
    additionalInformationLink: '',
    reserve: 0,
    currentAmount: 0,
    status: 0,
    dateCreated: 0
  },
  currentAuctionReady: false,
  httpError: false
}

const getters = {
	getUser: state => { return state.user },
  isUserLoggedIn: state => { return state.userLoggedIn },
  isLoginError: state => { return state.loginError },
  getLoginErrorMessage: state => { return state.loginErrorMessage },
  getHttpError: state => { return state.httpError },
  getCurrentAuction: state => { return state.currentAuction  },
  getCurrentAuctionAmount: state => { return state.currentAuction.currentAmount  },
  getAccountBalance: state => { return state.user.accountBalance.formatMoney(2) },
  getTotalBidsMade: state => { return state.user.totalBidsMade },
  getUserEmail: state => { return state.user.email }
}

const mutations = {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state, user) {
      state.pending = false
      state.user.role = user.role
      state.user.email = user.email
      state.user.accountBalance = user.accountBalance
      state.user.totalBidsMade = user.totalBidsMade
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
    },
    [SET_HTTP_ERROR] (state){
      state.httpError = true
    },
    SET_CURRENT_AUCTION: (state, {auctionDetails}) => {
      state.currentAuction = auctionDetails
      state.currentAuctionReady = true
    },
    BID_MADE: (state) => {
      state.user.accountBalance--
      state.user.totalBidsMade++
    },
    BID_RESPONSE_RECIEVED: (state, currentAmount) => {
      console.log("THE CURRENT AMOUNT FROM STORE MUTE: " + currentAmount)
      state.currentAuction.currentAmount = currentAmount
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
            var user = {
            	email: creds.email,
            	role: response.data.role,
              accountBalance: response.data.userAccountBalance,
              totalBidsMade: response.data.totalBidsMade
            }
            commit(LOGIN_SUCCESS, user)
        }).catch(function (e) {
            commit(LOGIN_ERROR, e.response.data.message)
        })
   },
   logout({ commit }) {
     localStorage.removeItem('id_token')
     commit(LOGOUT)
   },
   fetchCurrentAuction({ commit }, auctionId){
      HTTP.get('auctions/' + auctionId).then((response) => {
        commit('SET_CURRENT_AUCTION', { auctionDetails: response.data })
      }, (err) => {
        commit(SET_HTTP_ERROR)
      })
   }
}

export default new Vuex.Store ({
	state,
	getters,
	mutations,
	actions
})