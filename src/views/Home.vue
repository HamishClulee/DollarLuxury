<template>
  <section class="container home-container">
    <moment-testing/>
    <div v-for="auction in auctions">
      <h1>{{ auction.name }}</h1>
    </div>



  </section>
</template>


<script>
import AuctionList from '@/components/content/AuctionList.vue'
import axios from 'axios'
import MomentTesting from '@/components/MomentTesting.vue'

export default {
  name: 'Home',
  components: {
    'auction-list': AuctionList,
    'moment-testing': MomentTesting
  },
  data () {
    return {
      msg: 'hello',
      auctions: []
    }
  },
  mounted () {
    axios.get('http://localhost:8080/auctions').then(response => this.auctions = response.data).catch(function (error) {
      console.log(error);
    })
  }
}
</script>

<style scoped>
.home-container {
  padding: 60px;
}
</style>
