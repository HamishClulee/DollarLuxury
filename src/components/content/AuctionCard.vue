<template>
  <section>
  	<router-link class="card" :to="'/auctions/' + auctionId" :auctionId="auctionId">
  		<div class="card-image">
	    <figure class="image is-4by3">
	      <img src="../../assets/macbook.jpg" alt="Image">
	    </figure>
	  </div>
	  <div class="card-content">
	    <div class="media">
	      <div class="media-content">
	        <p class="title is-4">{{ name }}</p>
	        <p class="subtitle is-6"><a :href='additionalInformationLink' target='_blank'>More Info...</a></p>
	        <p>{{ shortDescription }}</p>
	      </div>
	    </div>
	    <div class="content">
	      <p class="title is-6">For Dev Only..</p>
	      <p><small>Reserve: ${{ reserveTotal }}</small></p>
	      <p><small>Current Total: ${{ currentTotal }}</small></p>
	      <p><small>Date Created: {{ formatDate(dateCreated) }}</small></p>
	    </div>
	  </div>
  	</router-link>
  </section>
</template>


<script>
import moment from 'moment'

export default {
  name: 'Auction',
  props: ['name', 'shortDescription', 'dateCreated', 'additionalInformationLink', 'reserveTotal', 'currentTotal', 'auctionId'],
  data () {
    return {
    }
  },
  methods: {
    formatDate (d) {
      return moment(d).format("DD MMM YYYY HH:mm a")
    }
  }
}

</script>

<style>

</style>
