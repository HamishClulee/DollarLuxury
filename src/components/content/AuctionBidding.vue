<template>
  <div>
    <div v-if="setUpPending">
      <large-spinner/>
    </div>
    <div v-if="!setUpPending">
      <auction-won-notification v-if="thatBidWasAWinner"></auction-won-notification>
      <no-balance-notification v-if="showOutOfBalanceNote"></no-balance-notification>
      <div class="bidding-container">
          <multiselect 
            v-model="selectedTimeSpan" :options="chartTimeOptions" 
            track-by="id" label="span"
            placeholder="Select a date range" :searchable="false"
            @input="newRangeSelection"
          />
        <bidding-chart :chartdata="formattedChartData" :timespan="selectedTimeSpan"></bidding-chart>
      </div>
      <a class="button is-primary is-fullwidth is-large" v-bind:class="{ 'is-loading' : socketWaiting }" v-if="socketConnected && getUserBalance" @click="sendBid">Send Bid</a>
    </div>
  </div>
</template>


<script>
import BiddingChart from '@/components/content/BiddingChart.vue'
import NoBalanceNotification from '@/components/util/NoBalanceNotification.vue'
import AuctionWonNotification from '@/components/content/AuctionWonNotification.vue'
import LargeSpinner from '@/components/util/LargeSpinner.vue'
import Multiselect from 'vue-multiselect'
import SockJS from 'sockjs-client'
import { mapMutations, mapGetters } from 'vuex'
import {Utils} from '@/store/Utils.js'
import {HTTP} from '@/axios'
import moment from 'moment'

export default {
  name: 'AuctionBidding',
  components: {
  	'no-balance-notification': NoBalanceNotification,
    'auction-won-notification': AuctionWonNotification,
    'bidding-chart': BiddingChart,
    'large-spinner': LargeSpinner,
    'multiselect': Multiselect
  },
  data () {
    return {
      setUpPending: true,
      socketConnected: false,
      thatBidWasAWinner: false,
      socketWaiting: false,
      showOutOfBalanceNote: false,
      // formattedFilteredChartData: [],
      formattedChartData: [],
      chartTimeOptions: [
        {id: 0, span: "Last Day", number: 1,  duration: "days"},
        {id: 1, span: "Last 3 Days", number: 3,  duration: "days"},
        {id: 2, span: "Last Week", number: 7,  duration: "days"},
        {id: 3, span: "Last Month", number: 1,  duration: "months"}
      ],
      selectedTimeSpan: ''
    }
  },
  methods: {
    formatChartData(setUp, subsequent) {
      if(setUp){
        var arr = []
        setUp.forEach(function (d) {
          var obj = {
            amount: d.currentAmount,
            date: moment(d.timeStamp).format("DD/MM/YYYY h:mm:ss") 
          }
          arr.push(obj)
        })
        this.formattedChartData = arr
      }

      if(subsequent){
        this.formattedChartData.push({
          amount: subsequent.updatedCurrentAmount,
          date: moment().format("DD/MM/YYYY h:mm:ss")
        })
      }
    },
    sendBid(){
      if(!this.socketWaiting && this.getUserBalance > 0){
        var g = Utils.guid()
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

      this.formatChartData(null, JSON.parse(resp.body))

      JSON.parse(resp.body).winner ? this.winningBidMade() : null
    },
    winningBidMade() {
      this.thatBidWasAWinner = true
    },
    newRangeSelection(e) {
      this.selectedTimeSpan = e
    },
    ...mapMutations([
      'BID_RESPONSE_RECIEVED', 'SET_HTTP_ERROR'
    ])
  },
  mounted () {
    HTTP.get('restallbids/' + this.getCurrentAuction.id + "/" + this.getUserEmail )
      .then( response => this.formatChartData(response.data, null))
      .catch(error => this.SET_HTTP_ERROR(error))

    this.setUpPending = false

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
    ...mapGetters(['getUserEmail', 'getCurrentAuctionAmount', 'getCurrentAuction', 'getUserBalance'])
  }
}
</script>

<style>
@import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';

.bidding-container {

}
</style>