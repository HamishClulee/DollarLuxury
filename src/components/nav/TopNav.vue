<template>
  <section>
    <nav class="nav drop-shadow-bottom">
      <div class="nav-left logo-nav">
        <figure class="image is-96x96">
          <img src="../../assets/DollarLuxuryLogoTRANS.png" alt="Logo">
        </figure>
        <router-link tag="a" to="/" exact class="nav-item pad-left">Home</router-link>
        <router-link tag="a" to="/auctions" class="nav-item">Auctions</router-link>
        <router-link tag="a" to="/account" class="nav-item">Account</router-link>
      </div>

      <div class="nav-center icon-nav">
        <a class="nav-item">
          <span class="icon">
            <a href="https://facebook.com" target="_blank">
              <i class="fa fa-facebook"></i>
            </a>
          </span>
        </a>
        <a class="nav-item">
          <span class="icon">
            <a href="https://twitter.com" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
          </span>
        </a>
        <a class="nav-item">
          <span class="icon">
            <a href="https://instagram.com" target="_blank">
              <i class="fa fa-instagram"></i>
            </a>
          </span>
        </a>
      </div>

      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

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
      </div>
    </nav>
    <login-modal v-if="showLoginModal" @closeLoginModal="showLoginModal = false"/>
  </section>
</template>

<script>
import LoginModal from '@/components/nav/LoginModal.vue'

export default {
  name: 'TopNav',
  components: {
    'login-modal': LoginModal
  },
  data () {
    return {
      msg: 'hello vue',
      showLoginModal: false
    }
  }
}
</script>

<style scoped>

.logo-nav {
  padding-left: 20px;
}

.pad-left {
  padding-left: 60px;
}

.drop-shadow-bottom {
  box-shadow: 0 4px 10px -2px rgba(0,0,0,0.30);
}

.icon-nav {
  padding-right: 25px;
}

</style>
