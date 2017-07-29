<template>
  <section class="container account-container">
    <div class="testing-list">Auction Winner Emails: {{ auctionWinners }}</div>
    <div class="testing-list">Closed Auctions: {{ closedAuctions }}</div>
    <show-all-users/>
  </section>
</template>

<script>
import ShowAllUsers from '@/components/dev/ShowAllUsers.vue'
import {HTTP} from '@/axios'
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    'show-all-users': ShowAllUsers
  },
  data () {
    return {
      auctionWinners: [],
      closedAuctions: []
    }
  },
  mounted () {
    // get all the auctions that have been won and their winners
    HTTP.get('auctionwinners')
      .then(response => this.auctionWinners = response.data)
      .catch(error => this.SET_HTTP_ERROR())
      
    // get all the auctions 
    HTTP.get('closedauctions')
      .then(response => this.closedAuctions = response.data)
      .catch(error => this.SET_HTTP_ERROR())

  },
  methods: {
    ...mapMutations(['SET_HTTP_ERROR'])
  }
}
</script>

<style scoped>
.account-container {
  padding: 60px;
}

.testing-list {
  padding: 40px;
}
</style>
