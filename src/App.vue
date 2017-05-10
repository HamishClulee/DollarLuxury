<template>
  <div id="app">
    <top-nav/>
    <hero/>
    <router-view></router-view>
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
      pagetitle: 'Welcome',
      pagesubtitle: 'TEST'
    }
  }

}
</script>

<style>

</style>
