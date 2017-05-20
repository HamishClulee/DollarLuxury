<template>
  <section class="container home-container">Place Holder for admin</section>
</template>


<script>
import axios from 'axios'
import MomentTesting from '@/components/MomentTesting.vue'

export default {
  name: 'Home',
  components: {
    'moment-testing': MomentTesting,
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
