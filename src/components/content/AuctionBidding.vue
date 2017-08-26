<template>
  <div>
    <!-- if axios to get auction data call is pending -->
    <div v-if="setUpPending">
      <large-spinner/>
    </div>
    <div v-else>
      <!-- if auction won -->
      <auction-won-notification v-if="getCurrentAuction.isClosed"></auction-won-notification>
      <!-- if no user has no balance -->
      <no-balance-notification v-if="!getUserBalance"></no-balance-notification>
      <!-- if no user has no balance -->
      <div class="bidding-container" v-if="!getCurrentAuction.isClosed">
          <!-- shows time range options for chart date range based on date range of bids already made -->
          <multiselect 
            v-model="selectedTimeSpan" :options="chartTimeOptions" 
            track-by="id" label="span"
            placeholder="Select a date range" :searchable="false"
            @input="newRangeSelection"
          />
        <!-- bids chart -->
        <bidding-chart 
          :chartdata="formattedChartData" 
          :timespan="selectedTimeSpan">
        </bidding-chart>
      </div>
      <!-- bid button -->
      <template v-if="getUserBalance">
        <a 
          class="button is-primary is-fullwidth is-large" 
          v-bind:class="{ 'is-loading' : !getSocketEnabled }" 
          @click="sendBid">
          Send Bid
        </a>
      </template>
      
    </div>
  </div>
</template>


<script>
// SEND_BID is the export constant for the web sockets implementation
import { SEND_BID } from '@/store/index.js'
// dollar luxury components
import BiddingChart from '@/components/content/BiddingChart.vue'
import NoBalanceNotification from '@/components/util/NoBalanceNotification.vue'
import AuctionWonNotification from '@/components/content/AuctionWonNotification.vue'
import LargeSpinner from '@/components/util/LargeSpinner.vue'
// vendor component
import Multiselect from 'vue-multiselect'

import { HTTP } from '@/axios'
import moment from 'moment'
import { mapMutations, mapGetters } from 'vuex'

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
      // flag for set up spinner
      setUpPending: true,
      // is websocket connection ready
      socketConnected: true,
      // no prizes here...
      thatBidWasAWinner: false,
      // for disbaling bidding while waiting for socket response
      socketWaiting: false,
      // no money!!
      showOutOfBalanceNote: false,
      // for chart data, formatted from axios server response on set up and subsequent websocket bid responses
      formattedChartData: [],
      // drop down options for multiselect
      chartTimeOptions: [{id: 1, span: "Last Day", number: 1,  duration: "days"}],
      // selected by multiselect
      selectedTimeSpan: '',
      // the date range in days between first bid and last bid for this user on this auction
      duration: 0
    }
  },
  methods: {
    // set up is axios response, subsequent is websocket responses 
    formatChartData(setUp, subsequent) {

      if(setUp === []){
        
      }

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

        // get the date range of all bids to populate the multiselect box
        // and ensure user cannot select a date range outside the bid range
        var min = 0;
        var max = 0;
        var format = "DD/MM/YYYY"
        if(this.formattedChartData.length > 0){
          this.formattedChartData.forEach(function(d, i){
            if(i === 0){
              min = moment(d.date, format)
              max = moment(d.date, format)
            }
            moment(d.date, format) < min ? min = moment(d.date, format) : null
            moment(d.date, format) > max ? max = moment(d.date, format) : null
          })
        }

        this.duration = moment(max - min).format("D")
        this.buildDropDownOptions()
      }

      if(subsequent){
        this.formattedChartData.push({
          amount: subsequent.updatedCurrentAmount,
          date: moment().format("DD/MM/YYYY h:mm:ss")
        })
      }
    },
    sendBid(){
      SEND_BID({ email: this.getUserEmail, auctionId: this.$route.params.id })
      this.formatChartData(null, { updatedCurrentAmount: this.getCurrentAuctionAmount })
    },
    newRangeSelection(e) {
      // nultiselect handler
      this.selectedTimeSpan = e
    },
    buildDropDownOptions() {
      // builds options objects for the drop down based on the date range between first and last bid
      this.chartTimeOptions = [{id: 1, span: "Last Day", number: 1,  duration: "days"}]
      if(this.duration !== 0){
        this.duration > 3 ? this.chartTimeOptions.push({id: 2, span: "Last 3 Days", number: 3,  duration: "days"}) : null
        this.duration > 5 ? this.chartTimeOptions.push({id: 3, span: "Last Week", number: 7,  duration: "days"},) : null
        this.duration > 14 ? this.chartTimeOptions.push({id: 4, span: "Last 2 Weeks", number: 2,  duration: "weeks"}) : null
        this.duration > 28 ? this.chartTimeOptions.push({id: 5, span: "Last 4 Weeks", number: 4,  duration: "weeks"}) : null
      }
    },
    ...mapMutations(['SET_HTTP_ERROR'])
  },
  mounted () {
    // get all bids all ready made on this auction by this user
    HTTP.get('restallbids/' + this.getCurrentAuction.id + "/" + this.getUserEmail )
      .then( response => this.formatChartData(response.data, null))
      .catch( error => this.SET_HTTP_ERROR(error))

    // cancel loading spinner - show component
    this.setUpPending = false
  },
  computed: {
    ...mapGetters(['getUserEmail', 'getCurrentAuctionAmount', 'getCurrentAuction', 'getUserBalance', 'getSocketEnabled'])
  }
}
</script>

<style>
@import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';

.bidding-container {

}
</style>