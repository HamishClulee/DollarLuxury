<template>
    <div class="box">
        <div class="help is-danger" v-if="error">
            <p>There was an error, unable to sign in with those credentials.</p>
        </div>
        <div>
            <div class="field">
                <label class="label">E-mail</label>
                <input type="email" id="email" class="input" placeholder="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="input" v-model="password" required>
            </div>
            <button class="button is-primary" @click="signin">Sign in</button>
        </div>
    </div>
</template>

<script>
import auth from '@/auth/auth.js'

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            error: false 
        }
    },
    methods: {
        signin (event){
            auth.signin(this, this.email, this.password)
        }
    }
}
</script>
