<template>
<!-- 'name', 'shortDescription', 'dateCreated', 'additionalInformationLink', 'reserveTotal', 'currentTotal' -->
  <div class="container is-fullwidth">
    <button class="button is-info is-fullwidth" @click="loadData">Load All Auctions</button>
    <button class="button is-warning is-fullwidth" @click="clearData">Clear All Auctions</button>
    <div class="box">
      <h1 class="has-text-centered title is-6 auction-list-heading">Current Auctions</h1>
      <div class="conatiner is-fullwidth">
        <div class="columns is-multiline">
          <div class="column is-one-third"  v-for='auction in auctions' v-model='auctions' v-if='auction.status == 1'>
            <auction-card :name='auction.name' :shortDescription='auction.shortDescription' :dateCreated='auction.dateCreated' :additionalInformationLink='auction.additionalInformationLink' :reserveTotal='auction.reserve' :currentTotal='auction.currentAmount' :auctionId='auction.id'></auction-card>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <h1 class="has-text-centered title is-6 auction-list-heading">Upcoming Auctions</h1>
      <div class="conatiner is-fullwidth">
        <div class="columns is-multiline">
          <div class="column is-one-third"  v-for='auction in auctions' v-model='auctions' v-if='auction.status == 2'>
            <auction-card :name='auction.name' :shortDescription='auction.shortDescription' :dateCreated='auction.dateCreated' :additionalInformationLink='auction.additionalInformationLink' :reserveTotal='auction.reserve' :currentTotal='auction.currentAmount'></auction-card>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <h1 class="has-text-centered title is-6 auction-list-heading">Past Auctions</h1>
      <div class="conatiner is-fullwidth">
        <div class="columns is-multiline">
          <div class="column is-one-third"  v-for='auction in auctions' v-model='auctions' v-if='auction.status == 3'>
            <auction-card :name='auction.name' :shortDescription='auction.shortDescription' :dateCreated='auction.dateCreated' :additionalInformationLink='auction.additionalInformationLink' :reserveTotal='auction.reserve' :currentTotal='auction.currentAmount'></auction-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AuctionCard from '@/components/content/AuctionCard.vue'
import {HTTP} from '@/axios';

export default {
  name: 'AuctionList',
  components: {'auction-card': AuctionCard},
  data () {
    return {
      auctions: []
    }
  },
  methods: {
    loadData () {
      console.log(this.auctions)
      HTTP.get('auctions').then(response => this.auctions = response.data).catch(function (error) {
        console.log(error);
      })
    },
    clearData () {
      console.log(this.auctions)
      this.auctions = []
    }
  }
}

// for polling
// mounted () {
//     this.loadData()
//     setInterval(function () {
//       this.loadData()
//     }.bind(this), 300000) 
//   }

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
