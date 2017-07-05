<template>
  <div>
    <!-- <dollar-spinner-small v-if="pending"></dollar-spinner-small> -->
    <div class="bidding-container"></div>
    <a class="button" @click="connectSocket">Connect</a>
    <a class="button" @click="sendBid">Send Bid</a>
  </div>
  </div>
</template>


<script>
import DollarSpinnerSmall from '@/components/util/DollarSpinnerSmall.vue'
import SockJS from 'sockjs-client'

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
      invokeIdCnt: 0,
      socketConnected: false
    }
  },
  methods: {
    connectSocket() {
      
    },
    sendBid(){
      this.stompClient.send("/app/bid", {}, JSON.stringify({'id': '1212121212'}));
    }
  },
  mounted () {
    var socket = new SockJS('http://localhost:8080/startBidding')

    this.stompClient = Stomp.over(socket)

    var that = this
    this.stompClient.connect({}, function () {

      this.socketConnected = true

      that.stompClient.subscribe('/allBids/bidresponse', function (greeting) {
        console.log(JSON.parse(greeting.body).content)
      })

    })
  }
}

</script>

<style>
.bidding-container {
	height: 800px;
	background-color: white;
}

</style>