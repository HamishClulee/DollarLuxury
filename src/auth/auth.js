import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default {
    user: {
        authenticated: false,
        username: null,
        role: null
    },
    check() {
        let token = localStorage.getItem('id_token')
        if (token !== null) {
            axios.get(
                'http://localhost:8080/api/user?token=' + token,
            ).then(response => {
                this.user.authenticated = true
                this.user.profile = response.data.data
            })
        }
    },
    register(context, user) {
        axios.post(
            'http://localhost:8080/register',
            {   
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address, 
                password: user.password,
                role: "user"           
            }
        ).then(response => {
            context.success = true
        }, response => {
            context.response = response.data
            context.error = true
        })
    },
    signin(context, email, password) {
        axios.post(
            'http://localhost:8080/login',
            {
                username: email,
                password: password
            }
        ).then(response => {
            context.error = false

            localStorage.setItem('id_token', response.data.token)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('role', response.data.role)

            //this.storeToken(response.data.token)

            console.log("Logged from auth.js: signin(): value of response.data.token: " + response.data.token)

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

            this.user.authenticated = true

            this.user.profile = response.data.data

            console.log("Logged from auth.js: signin(): value of this.user.profile: " + this.user.profile)

        }, response => {
            context.error = true
        })
    },
    signout() {
        localStorage.removeItem('id_token')
        this.user.authenticated = false
        this.user.role = null
        this.user.username = null
    },
    storeToken (response) {

        const auth = store.state.auth
        const user = store.state.user

        auth.isLoggedIn = true
        auth.accessToken = response.body.access_token
        auth.refreshToken = response.body.refresh_token


        user.username = 'John Smith'
        user.role = 'user'

        store.commit('UPDATE_USER', user)
  }
}