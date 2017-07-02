<template>
  <div>
	<h1 class="title">{{ auction.name }}</h1>
      <h2 class="subtitle">
        {{ auction.longDescription }}
      </h2>
      <h2 class="subtitle">
        <a :href="auction.additionalInformationLink">More info...</a>
      </h2>
      <h2 class="subtitle">
        Auction created {{ dateCreated }} days ago...
      </h2>
      <slot></slot>
      <div class="card-image">
      <div class="columns">
      	<div class="column is-3">
      	  <figure class="image is-256x256">
	        <img src="http://bulma.io/images/placeholders/256x256.png">
	      </figure>
      	</div>
      	<div class="column is-3">
      	  <figure class="image is-256x256">
	        <img src="http://bulma.io/images/placeholders/256x256.png">
	      </figure>
      	</div>
      	<div class="column is-3">
      	  <figure class="image is-256x256">
	        <img src="http://bulma.io/images/placeholders/256x256.png">
	      </figure>
      	</div>
      	<div class="column is-3">
      	  <figure class="image is-256x256">
	        <img src="http://bulma.io/images/placeholders/256x256.png">
	      </figure>
      	</div>
      </div>
	  </div>
	</div>
</template>


<script>
import {HTTP} from '@/axios'
import moment from 'moment'

export default {
  name: 'AuctionInfo',
  data () {
    return {
      auction: {}
    }
  },
  mounted () {
	HTTP.get('auctions/' + this.$route.params.id).then(response => this.auction = response.data).catch(function (error) {
  		console.log("get single auction axios errors: " + error);
	})
  },
  computed:{
  	dateCreated () {
  		return moment().diff(this.auction.dateCreated, 'days')
  	}
  }
}

</script>

<style>

</style>