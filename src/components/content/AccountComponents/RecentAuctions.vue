<template>
  <section class="is-fullwidth box section">
    <h1 class="title is-3 has-text-centered">
      Your Recent Auctions
    </h1>
    <template v-for="item in recentAuctions">
      <div><router-link as="a" :to="'/auctions/' + item.id">{{ item.name }}</router-link></div>
    </template>
  </section>
</template>

<script>
import { HTTP } from '@/axios'
import { mapGetters, mapMutations } from 'vuex'


export default {
  name: 'RecentAuctions',
  data () {
    return {
      allBids: [],
      recentAuctions: []
    }
  },
  mounted() {
    var email = this.getUserEmail
    HTTP.get('restallbids')
    .then(response => this.allBids = response.data.filter(function (d){
      return d.userEmail === email
    }))
    .catch(error => this.SET_HTTP_ERROR())
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  },
  methods: {
        ...mapMutations(['SET_HTTP_ERROR']),
    buildRecentAuctions() {
      var usersRecentAuctionIDs = []
      var auctionNames = []
      for(var i = 0; i < this.allBids.length; i++){
        if(usersRecentAuctionIDs.indexOf(this.allBids[i].auctionId) === -1){
          usersRecentAuctionIDs.push(this.allBids[i].auctionId)
          this.recentAuctions.push({
            name: this.allBids[i].auctionName,
            id: this.allBids[i].auctionId
          })
        }
      }
    }
  },
  watch: {
    allBids: function () {
      this.buildRecentAuctions()
    }
  }
}

</script>

<style>

</style>