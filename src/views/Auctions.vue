<template>
  <section class="container auction-container">
      <auction-list></auction-list>
  </section>
</template>

<script>
import AuctionList from '@/components/content/AuctionList.vue'

export default {
  name: 'Auctions',
  components: {
    'auction-list': AuctionList
  }
}
</script>

<style scoped>
.auction-container {
  padding: 60px;
}
</style>
