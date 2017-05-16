<template>
  <div class="modal is-active">
      <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div class="field login-form">
              <label class="label">Email</label>
              <p class="control has-icons-left has-icons-right">
                <input class="input is-primary" type="text" placeholder="Email" v-model="email">
              </p>
            </div>
            <div class="field login-form">
              <label class="label">Password</label>
              <p class="control has-icons-left has-icons-right">
                <input class="input is-primary" type="password" placeholder="Password" v-model="password">
              </p>
            </div>
            <div class="field login-form">
              <p class="control">
                <label class="checkbox">
                  <input type="checkbox">
                  I agree to the <a href="#">terms and conditions</a>
                </label>
              </p>
            </div>
            <div class="field is-grouped login-form">
              <p class="control">
                <button class="button is-primary" @click="login">Submit</button>
              </p>
            </div>
          </div>
        </div>
      <button class="modal-close" @click="$emit('closeLoginModal')"></button>
    </div>
</template>


<script>
import store from '@/store'

export default {
  name: 'LoginModal',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login (){
      this.$store.dispatch("login", {
          email: this.email,
          password: this.password
      })
    }
  }
}

</script>

<style>
.login-form {
	padding: 10px;
}
</style>
