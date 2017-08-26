<template>
  <div id="app">
    <top-nav/>
    <hero/>
    <http-error v-if="getHttpError"></http-error>
    <transition name="fade"><router-view></router-view></transition>
    <site-footer></site-footer>
  </div>
</template>

<script>
import TopNav from '@/components/nav/TopNav.vue'
import Hero from '@/components/nav/Hero.vue'
import SiteFooter from '@/components/nav/SiteFooter.vue'
import HttpError from '@/components/util/HttpError.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    'top-nav': TopNav,
    'hero': Hero,
    'site-footer': SiteFooter,
    'http-error': HttpError
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['getHttpError'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i');

/* ----- Global CSS ------ */
body, html {
  font-family: 'Open Sans', sans-serif;
}
</style>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
