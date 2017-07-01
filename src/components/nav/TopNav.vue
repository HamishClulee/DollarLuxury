<template>
  <section class="top-nav-container">
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

      <log-in-sign-up/>
    </nav>
  </section>
</template>

<script>
import LogInSignUp from '@/components/nav/LogInSignUp.vue'

export default {
  name: 'TopNav',
  components: {
    'log-in-sign-up': LogInSignUp
  },
  mounted: () => {
    console.log("app.vue")
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

.top-nav-container {
  position: fixed;
  width: 100%;
  z-index: 100;
}

</style>
