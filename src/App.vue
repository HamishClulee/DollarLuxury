<template>
  <div id="app">
    <top-nav/>
    <hero/>
    <transition name="fade" mode="out-in"><router-view></router-view></transition>
    <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <span class="footer-icon">
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
            </span>
          </p>
        </div>
    </footer>
  </div>
</template>

<script>
import TopNav from './components/nav/TopNav.vue'
import Hero from './components/nav/Hero.vue'

export default {
  name: 'app',
  components: {
    'top-nav': TopNav,
    'hero': Hero
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i');

/* ----- Global CSS ------ */
body, html {
  font-family: 'Open Sans', sans-serif;
}

.footer {
  height: 28px;
}

.footer-icon {
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.footer-icon-item {
  margin: 5px 20px;
  opacity: 0.5;
  color: #3273dc;
}

.footer-icon-item:hover {
  opacity: 1;
  cursor: pointer;
}

</style>
