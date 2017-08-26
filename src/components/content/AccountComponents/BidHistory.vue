<template>
  <section class="is-fullwidth box section">
    <h1 class="title is-3 has-text-centered">
      Your Bid History
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th>Auction Name</th>
          <th>Date</th>
          <th>Auction Amount</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in allBidsForUser">
          <tr>
            <th>{{ row.auctionName }}</th>
            <td>{{ convertDates(row) }}</td>
            <td>{{ row.currentAmount }}</td>
          </tr>        
        </template>
      </tbody>
    </table>
  </section>
</template>


<script>
import { HTTP } from '@/axios'
import { mapGetters, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'BidHistory',
  data () {
    return {
      allBidsForUser: []
    }
  },
  mounted() {
    var email = this.getUserEmail

    // get all bids, filter by user email
    HTTP.get('restallbids')
      .then(response => this.allBidsForUser = response.data.filter(function (d){
        return d.userEmail === email
      }))
      .catch(error => this.SET_HTTP_ERROR())    
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  },
  methods: {
    ...mapMutations(['SET_HTTP_ERROR']),
    convertDates(date){
      return moment(date).format("DD/MM/YY")
    }
  }
}

</script>

<style>


</style>