<template>
	<div class="box is-fullwidth has-text-centered pad">
		<button class="button is-info" @click="loadAuctionData($route.params.id)">Load Auction Data</button>
		<h1 class="title is-1 pad"> {{ auction.name }}</h1>
	</div>
</template>


<script>
import {HTTP} from '@/axios'

export default {
  name: 'Auction',
  data () {
    return {
      auctionId: -1,
      auction: {}
    }
  },
  methods: {
  	loadAuctionData(id){
  		console.log("route params id: " + id)
  		HTTP.get('auctions/' + id).then(response => this.auction = response.data).catch(function (error) {
        	console.log("get single auction axios errors: " + error);
      })
  	}
  }
}

</script>

<style scoped>
.pad {
	margin-top: 50px;
}
</style>