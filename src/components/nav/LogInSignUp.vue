<template>
	<div class="nav-right nav-menu">
        <div class="nav-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button" @click="showLoginModal = true" >
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

export default {
  name: 'LogInSignUp',
  components: {
  	'login-modal': LoginModal
  },
  data () {
    return {
      showLoginModal: false
    }
  }
}

</script>

<style>

</style>