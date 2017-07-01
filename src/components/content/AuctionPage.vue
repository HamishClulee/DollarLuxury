<template>
  <section>
    <div class="container">
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
	  <div class="box">
	  	<h1 class="title">Auction</h1>
	  	<a class="button is-large is-primary is-fullwidth">Start Bidding Now...</a>
	  </div>
    </div>
  </section>
</template>


<script>
import {HTTP} from '@/axios'
import moment from 'moment'

export default {
  name: 'AuctionPage',
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