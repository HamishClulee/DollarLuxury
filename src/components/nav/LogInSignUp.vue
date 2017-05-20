<template>
	<div class="nav-right nav-menu">
        <div class="nav-item" v-if="userLoggedIn">
          <div class="field is-grouped">
            <p class="control">
              Welcome {{ user.email }}
            </p>
            <a class="button is-danger" @click="logout">
                <span class="icon">
                  <i class="fa fa-sign-out"></i>
                </span>
                <span>Logout</span>
              </a>
          </div>
        </div>
        <div class="nav-item" v-if="!userLoggedIn">
          <div class="field is-grouped">
            <p class="control">
              <a class="button" @click="showLoginModal = true">
                <span class="icon">
                  <i class="fa fa-sign-in"></i>
                </span>
                <span>Log In</span>
              </a>
            </p>
          </div>
        </div>
        <login-modal v-if="showLoginModal" @closeLoginModal="showLoginModal = false"/>
    </div>
</template>


<script>
import LoginModal from '@/components/nav/LoginModal.vue'
import { mapState } from 'vuex'
import store from '@/store'


export default {
  name: 'LogInSignUp',
  components: {
  	'login-modal': LoginModal
  },
  data () {
    return {
      showLoginModal: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
      this.email = ''
      this.password = ''
    }
  },
  computed: mapState([
    'userLoggedIn',
    'user'
  ]),
  watch: {
    'userLoggedIn': function () {
      this.showLoginModal = false
    }
  }
}

</script>

<style>

</style>