<template>
  <section class="container account-container">
    <show-all-users/>
  </section>
</template>

<script>
import ShowAllUsers from '@/components/dev/ShowAllUsers.vue'

export default {
  name: 'Home',
  components: {
    'show-all-users': ShowAllUsers
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
.account-container {
  padding: 60px;
}
</style>
