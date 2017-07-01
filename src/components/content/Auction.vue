<template>
    <div class="columns pad">
      <div class="column is-2"><auction-side-nav></auction-side-nav></div>
      <div class="column is-10">
        <h1 class="title is-1"> {{ auction.name }}</h1>
        <!-- AUCTION CONTENT HERE -->
        
      </div>
    </div>
		
</template>


<script>
import {HTTP} from '@/axios'
import AuctionSideNav from '@/components/content/AuctionSideNav.vue'

export default {
  name: 'Auction',
  components: {
    'auction-side-nav': AuctionSideNav
  },
  data () {
    return {
      auction: {}
    }
  },
  methods: {

  },
  mounted () {
    console.log("route params id: " + this.$route.params.id)  
		HTTP.get('auctions/' + this.$route.params.id).then(response => this.auction = response.data).catch(function (error) {
      	console.log("get single auction axios errors: " + error);
    })
  }
}

</script>

<style scoped>
.pad {
	margin-top: 50px;
  margin-left: 50px;
}
</style>