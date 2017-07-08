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
// /auctionWinners /closedAuctions
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
    HTTP.get('auctionWinners').then(response => this.auctionWinners = response.data).catch(function (error) {
        console.log(error);
    })
    HTTP.get('closedAuctions').then(response => this.closedAuctions = response.data).catch(function (error) {
        console.log(error);
    })
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
