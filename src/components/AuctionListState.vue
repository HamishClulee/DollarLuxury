<template>
<!-- 'name', 'shortDescription', 'dateCreated', 'additionalInformationLink', 'reserveTotal', 'currentTotal' -->
  <div class="container is-fullwidth">
    <div class="box">
      <h1 class="has-text-centered title is-6 auction-list-heading">Current Auctions STATE</h1>
      <div class="conatiner is-fullwidth">
        <div class="columns is-multiline">
          <div class="column is-one-third"  v-for='auction in auctions' v-model='auctions' v-if='auction.status == 1'>
            <auction :name='auction.name' :shortDescription='auction.shortDescription' :dateCreated='auction.dateCreated' :additionalInformationLink='auction.additionalInformationLink' :reserveTotal='auction.reserve' :currentTotal='auction.currentAmount'></auction>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <h1 class="has-text-centered title is-6 auction-list-heading">Upcoming Auctions STATE</h1>
      <div class="conatiner is-fullwidth">
        <div class="columns is-multiline">
          <div class="column is-one-third"  v-for='auction in auctions' v-model='auctions' v-if='auction.status == 2'>
            <auction :name='auction.name' :shortDescription='auction.shortDescription' :dateCreated='auction.dateCreated' :additionalInformationLink='auction.additionalInformationLink' :reserveTotal='auction.reserve' :currentTotal='auction.currentAmount'></auction>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <h1 class="has-text-centered title is-6 auction-list-heading">Past Auctions STATE</h1>
      <div class="conatiner is-fullwidth">
        <div class="columns is-multiline">
          <div class="column is-one-third"  v-for='auction in auctions' v-model='auctions' v-if='auction.status == 3'>
            <auction :name='auction.name' :shortDescription='auction.shortDescription' :dateCreated='auction.dateCreated' :additionalInformationLink='auction.additionalInformationLink' :reserveTotal='auction.reserve' :currentTotal='auction.currentAmount'></auction>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Auction from '@/components/content/Auction.vue'
import store from '@/store'

export default {
  name: 'AuctionListState',
  data () {
  	return {
  		auctions: []
  	}
  },
  components: {'auction': Auction}
}

</script>

<style scoped>

.auction-list {
  margin-top: 60px;
}

.auction-list-heading {
  text-align: center;
  border-bottom: 1px solid #00d1b2;
  padding: 40px;
  color: #5c5c5c;
}
</style>
