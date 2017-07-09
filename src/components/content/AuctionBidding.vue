<template>
  <div>
    <auction-won-notification v-if="thatBidWasAWinner"></auction-won-notification>
    <no-balance-notification v-if="showOutOfBalanceNote"></no-balance-notification>
    <div class="bidding-container"></div>
    <a class="button is-primary is-fullwidth is-large" v-bind:class="{ 'is-loading' : socketWaiting }" v-if="socketConnected && getUserBalance" @click="sendBid">Send Bid</a>

  </div>
</template>


<script>
import NoBalanceNotification from '@/components/util/NoBalanceNotification.vue'
import AuctionWonNotification from '@/components/content/AuctionWonNotification.vue'
import SockJS from 'sockjs-client'
import { mapMutations, mapGetters } from 'vuex'
import {Utils} from '@/store/Utils.js'

export default {
  name: 'AuctionBidding',
  components: {
  	'no-balance-notification': NoBalanceNotification,
    'auction-won-notification': AuctionWonNotification
  },
  data () {
    return {
      socketConnected: false,
      ClientGuidArray: [],
      ServerGuidArray: [],
      thatBidWasAWinner: false,
      socketWaiting: false,
      showOutOfBalanceNote: false
    }
  },
  methods: {
    sendBid(){
      if(!this.socketWaiting && this.getUserBalance > 0){
        var g = Utils.guid()
        this.ClientGuidArray.push(g)
        this.stompClient.send("/app/bid", {}, JSON.stringify({
            'userEmail': this.getUserEmail,
            'auctionId': this.$route.params.id, 
            'id': g,
            'timeStamp': new Date()
        }))
        this.socketWaiting = true
      } 

      if(!this.getUserBalance){
        this.showOutOfBalanceNote = true
      }
    },
    messageResponse(resp){
      this.BID_RESPONSE_RECIEVED(JSON.parse(resp.body).updatedCurrentAmount)
      this.socketWaiting = false
      JSON.parse(resp.body).winner ? this.winningBidMade() : null
    },
    winningBidMade() {
      this.thatBidWasAWinner = true
    },
    ...mapMutations([
      'BID_RESPONSE_RECIEVED'
    ])
  },
  mounted () {

    if(this.getUserBalance > 0 ){
      var socket = new SockJS('http://localhost:8080/startBidding')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, () => {
        this.socketConnected = true
        this.stompClient.subscribe('/allBids/bidResponse', (response) => {this.messageResponse(response)})
      })
    } else {
      this.showOutOfBalanceNote = true
    }

  },
  computed: {
    ...mapGetters(['getUserEmail', 'getCurrentAuctionAmount', 'getUserBalance'])
  }
}
</script>

<style scoped>
.bidding-container {
	height: 80px;
	background-color: white;
}
</style>