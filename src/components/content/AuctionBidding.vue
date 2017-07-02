<template>
  <div>
    <!-- <dollar-spinner-small v-if="pending"></dollar-spinner-small> -->
    <div class="bidding-container"></div>
  </div>
</template>


<script>
import DollarSpinnerSmall from '@/components/util/DollarSpinnerSmall.vue' 

export default {
  name: 'AuctionBidding',
  components: {
  	'dollar-spinner-small': DollarSpinnerSmall
  },
  data () {
    return {
      msg: '',
      pending: true,
      ready: false
    }
  }
}

</script>

<style>
.bidding-container {
	height: 800px;
	background-color: white;
}

</style>