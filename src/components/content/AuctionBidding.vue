<template>
  <div>
    <!-- <dollar-spinner-small v-if="pending"></dollar-spinner-small> -->
    <div class="bidding-container"></div>
    <a class="button" v-if="socketConnected" @click="sendBid">Send Bid</a>
  </div>
  </div>
</template>


<script>
import DollarSpinnerSmall from '@/components/util/DollarSpinnerSmall.vue'
import SockJS from 'sockjs-client'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AuctionBidding',
  components: {
  	'dollar-spinner-small': DollarSpinnerSmall
  },
  data () {
    return {
      msg: '',
      pending: true,
      ready: false,
      socketConnected: false,
      bidId: 0,
      userEmail: this.getUserEmail
    }
  },
  methods: {
    sendBid(){
      this.stompClient.send("/app/bid", {}, JSON.stringify({'id': this.bidId, 'email': this.userEmail, 'auctionId': this.$route.params.id}))
      this.bidId++
      this.BID_MADE()
    },
    ...mapMutations([
      'BID_MADE'
    ])
  },
  mounted () {
    var socket = new SockJS('http://localhost:8080/startBidding')
    this.stompClient = Stomp.over(socket)
    var that = this
    this.stompClient.connect({}, function () {
      that.socketConnected = true
      that.stompClient.subscribe('/allBids/bidresponse', function (greeting) {
        console.log(greeting.body)
      })
    })
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  }
}

</script>

<style>
.bidding-container {
	height: 80px;
	background-color: white;
}

</style>