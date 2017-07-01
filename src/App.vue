<template>
  <div id="app">
    <top-nav/>
    <hero/>
    <transition name="fade" mode="out-in"><router-view></router-view></transition>
    <site-footer></site-footer>
  </div>
</template>

<script>
import TopNav from './components/nav/TopNav.vue'
import Hero from './components/nav/Hero.vue'
import SiteFooter from './components/nav/SiteFooter.vue'

export default {
  name: 'app',
  components: {
    'top-nav': TopNav,
    'hero': Hero,
    'site-footer': SiteFooter
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
</style>
