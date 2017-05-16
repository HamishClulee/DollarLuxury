<template>
    <div class="box">
        <div>
            <div class="field">
                <label class="label">E-mail</label>
                <input type="email" id="email" class="input" placeholder="email" v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="input" v-model="password">
            </div>

            <button class="button is-primary" @click="login">Sign in</button>
            <button class="button is-primary" @click="alertLoggedInUserDetails">Is User Logged in?</button>
            <button class="button is-danger" @click="logout">log out</button>
        </div>
    </div>
</template>

<script>
import store from '@/store'

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login (){
            this.$store.dispatch("login", {
                email: this.email,
                password: this.password
            })
        },
        alertLoggedInUserDetails(){
            alert("User from store: " + JSON.stringify(this.$store.getters.getUser))
        },
        logout() {
            this.$store.dispatch("logout")
        }
    }
}
</script>
