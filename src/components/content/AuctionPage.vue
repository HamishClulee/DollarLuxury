<template>
  <section>
    <div class="container">
      <transition name="fade" mode="out-in">
	      <auction-info v-if="!biddingMode"><slot><a v-if="isUserLoggedIn"class="button is-large is-primary is-fullwidth" @click="startBidding">Start Bidding Now...</a><a v-if="!isUserLoggedIn"class="button is-large is-danger is-fullwidth" @click="startBidding">Login to start bidding</a></slot></auction-info>
	      <auction-bidding v-if="biddingMode && isUserLoggedIn"></auction-bidding>
      </transition>
    </div>
  </section>
</template>


<script>
import {mapGetters} from 'vuex'
import AuctionInfo from '@/components/content/AuctionInfo.vue'
import AuctionBidding from '@/components/content/AuctionBidding.vue'


export default {
  name: 'AuctionPage',
  components: {
  	'auction-info': AuctionInfo,
  	'auction-bidding': AuctionBidding
  },
  data () {
    return {
      auction: {},
      biddingMode: false
    }
  },
  methods: {
  	startBidding() {
  		this.biddingMode = true
  	}
  },
  computed: {
    ...mapGetters([
      'isUserLoggedIn'
    ])
  }
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>