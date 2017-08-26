<template>
  <section class="container account-container">
  <template v-if="isUserLoggedIn">
    <auction-user-panel></auction-user-panel>
    <add-balance-to-account></add-balance-to-account>
    <recent-auctions></recent-auctions>
    <bid-history></bid-history>
  </template>
  <template v-else>
    <div>Login in to view details...</div>
    <button class="button is-danger is-fullwidth">Log In</button>
  </template>

  </section>
</template>

<script>
import AuctionUserPanel from '@/components/content/AuctionUserPanel.vue'
import AddBalanceToAccount from '@/components/content/AccountComponents/AddBalanceToAccount.vue'
import RecentAuctions from '@/components/content/AccountComponents/RecentAuctions.vue'
import BidHistory from '@/components/content/AccountComponents/BidHistory.vue'

import {HTTP} from '@/axios'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    'auction-user-panel': AuctionUserPanel,
    'add-balance-to-account': AddBalanceToAccount,
    'recent-auctions': RecentAuctions,
    'bid-history': BidHistory
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
  },
  computed: {
    ...mapGetters(['isUserLoggedIn'])
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
