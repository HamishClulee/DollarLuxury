<template>
  <section class="auction-container">
  	<div class="columns">
  	  <div class="column is-2"><auction-side-nav></auction-side-nav></div>
      <div class="column is-10"><auction-list></auction-list></div>
    </div>
  </section>
</template>

<script>
import AuctionList from '@/components/content/AuctionList.vue'
import AuctionSideNav from '@/components/content/AuctionSideNav.vue'

export default {
  name: 'Auctions',
  components: {
    'auction-list': AuctionList,
    'auction-side-nav': AuctionSideNav
  }
}
</script>

<style scoped>
.auction-container {
  padding: 60px;
}
</style>
