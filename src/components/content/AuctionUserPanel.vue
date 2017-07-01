<template>
	<nav class="level auction-user-panel">
	  <div class="level-item has-text-centered">
	    <div>
	      <p class="heading">Account Balance</p>
	      <p class="title balance">${{ accountBalance }}</p>
	    </div>
	  </div>
	  <div class="level-item has-text-centered">
	    <div>
	      <p class="heading">Current Auction Percentage</p>
	      <p class="title percentage">{{ currentAuctionPercentage }}%</p>
	    </div>
	  </div>
	  <div class="level-item has-text-centered">
	    <div>
	      <p class="heading">Total Bids Made</p>
	      <p class="title total-bids">{{ totalBidsMade }}</p>
	    </div>
	  </div>
	  <div class="level-item has-text-centered">
	    <div>
	      <p class="heading">Bids Until Next Unlock</p>
	      <p class="title bids-until">{{ untilNextUnlock }}</p>
	    </div>
	  </div>
	</nav>
</template>


<script>
export default {
  name: 'AuctionUserPanel',
  data () {
    return {
      accountBalance: 40,
      currentAuctionPercentage: 79,
      totalBidsMade: 40,
      untilNextUnlock: 2
    }
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