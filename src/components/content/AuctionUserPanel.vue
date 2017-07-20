<template>
	<nav class="level auction-user-panel">
	  <div class="level-item has-text-centered">
	    <div>
	      <p class="heading">Account Balance</p>
	      <p class="title balance">${{ getAccountBalance }}</p>
	    </div>
	  </div>
	  <div class="level-item has-text-centered">
	    <div>
	      <p class="heading">Current Auction Percentage</p>
	      <p class="title percentage">{{ getPercentage }}%</p>
	    </div>
	  </div>
	  <div class="level-item has-text-centered">
	    <div>
	      <p class="heading">Total Bids Made</p>
	      <p class="title total-bids">{{ getTotalBidsMade }}</p>
	    </div>
	  </div>
	</nav>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AuctionUserPanel',
  data () {
    return {

    }
  },
  computed:{
  	dateCreated () {
  		return moment().diff(this.getCurrentAuction.dateCreated, 'days')
  	},
  	getPercentage() {
  		return Math.round(((this.getCurrentAuction.currentAmount / this.getCurrentAuction.reserve ) * 100))
  	},
    ...mapGetters(['getCurrentAuction', 'getAccountBalance', 'getTotalBidsMade'])
  }
}

</script>

<style scoped>
.auction-user-panel {
	border-bottom: 1px solid black;
	height: 150px;
	margin-right: 20px;
}

.balance {
	color: #00d1b2;
}

.percentage {
	color: #3273dc;
}

.total-bids {
	color: #20bc56
}

.bids-until {
	color: #ff3860;
}
</style>