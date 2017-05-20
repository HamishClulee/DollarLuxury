<template>
  <section class="container home-container">
    <moment-testing/>
    <register/>
    <login/>
  </section>
</template>


<script>
import AuctionList from '@/components/content/AuctionList.vue'
import axios from 'axios'
import MomentTesting from '@/components/MomentTesting.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    'moment-testing': MomentTesting,
    'register': Register,
    'login': Login
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 60px;
  max-width: none;
}
</style>
