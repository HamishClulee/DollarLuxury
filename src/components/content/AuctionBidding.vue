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
import {Utils} from '@/store/Utils.js'

export default {
  name: 'AuctionBidding',
  components: {
  	'dollar-spinner-small': DollarSpinnerSmall
  },
  data () {
    return {
      socketConnected: false,
      ClientGuidArray: [],
      ServerGuidArray: []
    }
  },
  methods: {
    sendBid(){
      var g = Utils.guid()
      this.ClientGuidArray.push(g)
      this.stompClient.send("/app/bid", {}, JSON.stringify({
          'userEmail': this.getUserEmail, 
          'auctionId': this.$route.params.id, 
          'id': g
        }))
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
    var respArray = []
    this.stompClient.connect({}, () => {
      that.socketConnected = true
      that.stompClient.subscribe('/allBids/bidresponse', (response) => {
        respArray.push(JSON.parse(response.body).status)
      })
    })
    this.ServerGuidArray = respArray
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  }
}
</script>

<style scoped>
.bidding-container {
	height: 80px;
	background-color: white;
}
</style>