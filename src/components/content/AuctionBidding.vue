<template>
  <div>
    <auction-won-notification v-if="thatBidWasAWinner"></auction-won-notification>
    <div class="bidding-container"></div>
    <a class="button" v-if="socketConnected" @click="sendBid">Send Bid</a>
  </div>
</template>


<script>
import DollarSpinnerSmall from '@/components/util/DollarSpinnerSmall.vue'
import AuctionWonNotification from '@/components/content/AuctionWonNotification.vue'
import SockJS from 'sockjs-client'
import { mapMutations, mapGetters } from 'vuex'
import {Utils} from '@/store/Utils.js'

export default {
  name: 'AuctionBidding',
  components: {
  	'dollar-spinner-small': DollarSpinnerSmall,
    'auction-won-notification': AuctionWonNotification
  },
  data () {
    return {
      socketConnected: false,
      ClientGuidArray: [],
      ServerGuidArray: [],
      thatBidWasAWinner: false,
    }
  },
  methods: {
    sendBid(){
      var g = Utils.guid()
      this.ClientGuidArray.push(g)
      this.stompClient.send("/app/bid", {}, JSON.stringify({
          'userEmail': this.getUserEmail,
          'auctionId': this.$route.params.id, 
          'id': g,
          'timeStamp': new Date()
        }))
      this.BID_MADE()
    },
    messageResponse(resp){
      this.BID_RESPONSE_RECIEVED(JSON.parse(resp.body).updatedCurrentAmount)
      JSON.parse(resp.body).winner ? this.winningBidMade() : console.log("NOT A WINNER G")
    },
    winningBidMade() {
      this.thatBidWasAWinner = true
    },
    ...mapMutations([
      'BID_MADE', 'BID_RESPONSE_RECIEVED'
    ])
  },
  mounted () {
    var socket = new SockJS('http://localhost:8080/startBidding')
    this.stompClient = Stomp.over(socket)
    this.stompClient.connect({}, () => {
      this.socketConnected = true
      this.stompClient.subscribe('/allBids/bidResponse', (response) => {this.messageResponse(response)})
    })
  },
  computed: {
    ...mapGetters(['getUserEmail', 'getCurrentAuctionAmount'])
  }
}
</script>

<style scoped>
.bidding-container {
	height: 80px;
	background-color: white;
}
</style>