import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '@/axios'
import moment from 'moment'
import SockJS from 'sockjs-client'
import { Utils } from './Utils.js'

Vue.use(Vuex)

const state = {
  socket_enabled: false,
  bid_messages: [],
  user_mail: [],
  socket_connected: false,
	counter: 0,
	pending: false,
	auctions: [],
  userLoggedIn: false,
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
  messageSummaries: [],
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
  getUserEmail: state => { return state.user.email },
  getUserBalance: state => { return state.user.accountBalance },
  getUserMessageSummaries: state => { return state.messageSummaries },
  getSocketEnabled: state => { return state.socket_enabled }
}

const mutations = {
    LOGIN (state) {
      state.loginPending = true;
    },
    LOGIN_SUCCESS (state, user) {
      state.loginPending = false
      state.user.role = user.role
      state.user.email = user.email
      state.user.accountBalance = user.accountBalance
      state.user.totalBidsMade = user.totalBidsMade
      state.userLoggedIn = true
    },
    LOGOUT (state) {
      state.user.role = null
      state.user.email = null
      state.user.currentAmount = 0
      state.user.accountBalance = 0
      state.user.totalBidsMade = 0
      state.userLoggedIn = false
    },
    LOGIN_ERROR (state, message) {
      state.loginError = true
      state.loginErrorMessage = message
    },
    SET_HTTP_ERROR (state){
      state.httpError = true
    },
    SET_CURRENT_AUCTION: (state, {auctionDetails}) => {
      state.currentAuction = auctionDetails
      state.currentAuctionReady = true
    },
    DISABLE_SOCKET: (state) => {
      state.socket_enabled = false
    },
    ENABLE_SOCKET: (state) => {
      state.socket_enabled = true
    },
    NEW_BID_RESPONSE: (state, { message }) => {
      // update client side details to reflect the server state
      state.currentAuction.currentAmount = JSON.parse(message.body).updatedCurrentAmount
      state.user.accountBalance--
      state.user.totalBidsMade++
      // check the if the user is a winner or out of funds - if not re-enable the socket
      JSON.parse(message.body).winner ? state.currentAuction.isClosed = true : state.socket_enabled = true
      JSON.parse(message.body).isOutOfFunds ? state.user.accountBalance = 0 : state.socket_enabled = true 
    },
    NEW_USER_MAIL: (state, { message }) => {
      state.user_mail.push(message)
    },
    SOCKET_CONNECTED: (state) => {
      state.socket_connected = true
    }
}

const actions = {
  CONNECT_SOCKET({ commit }){

  },
	LOGIN({ commit }, creds) {
     commit("LOGIN"); // show spinner
     return HTTP.post('login',{ email: creds.email, password: creds.password})
        .then(response => {
          localStorage.setItem('id_token', response.data.token)
          var user = {
          	email: creds.email,
          	role: response.data.role,
            accountBalance: response.data.userAccountBalance,
            totalBidsMade: response.data.totalBidsMade
          }
          commit("LOGIN_SUCCESS", user)
        })
        .catch(function (e) {
            commit("LOGIN_ERROR", e.response.data.message)
        })
   },
   FETCH_CURRENT_AUCTION({ commit }, auctionId){
      HTTP.get('auctions/' + auctionId).then((response) => {
        commit('SET_CURRENT_AUCTION', { auctionDetails: response.data })
      }, (err) => {
        commit("SET_HTTP_ERROR")
      })
   }
}

export default new Vuex.Store ({
	state,
	getters,
	mutations,
	actions
})

/*
* ---------------------------------------------------------------------------------------
* Websockets set up - ensure that Vuex maintains control ofd socket actions and responses
* ---------------------------------------------------------------------------------------
*/

// set up client and socket
const socketWaiting = () => {
  this.a.commit("DISABLE_SOCKET")
}

const openSocket = () => {
  this.a.commit("ENABLE_SOCKET")
}

const bidResponse = (resp) => {
  // -------- The mutation is called here ------------- //
  this.a.commit("NEW_BID_RESPONSE", { message: resp })
}

// EXPORT CONSTANTS - CONNECT_SOCKET_EXPORT - && - DISCONNECT_SOCKET_EXPORT - && - SEND_BID
var that = this
export const CONNECT_SOCKET_EXPORT = () => {
  // initialise the sockets
  const socket = new SockJS('http://localhost:8080/userLoggedIn')
  this.stompClient = Stomp.over(socket)
  // connect to server
  this.stompClient.connect({}, () => {
      openSocket()
      that.stompClient.subscribe('/bids/bidResponse', (response) => {
          // toggle socket flag and commit the bid response
          bidResponse(response)
      })
  })
}

// for disconnects on log out
export const DISCONNECT_SOCKET_EXPORT = () => {
  that.stompClient.disconnect()
}

export const SEND_BID = (params) => {
  // disbale socket while waiting for response
  socketWaiting()
  // send payload to server
  that.stompClient.send("/app/bid", {}, JSON.stringify({
    'userEmail': params.email,
    'auctionId': params.auctionId, 
    'id': Utils.guid(),
    'timeStamp': new Date()
  }))
}